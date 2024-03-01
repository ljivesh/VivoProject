import { Form } from "@/components/ui/form";
import GenerateVideoFormSchema, {
  GenerateFormSchemaType,
} from "@/schemas/GenerateVideoFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC } from "react";
import { useForm } from "react-hook-form";
import GenerateVideoFormField, {
  SelectionItem,
} from "./GenerateVideoFormField";
import {
  maleVoiceMappings,
  femaleVoiceMappings,
  voiceMappings,
} from "@/mappings/languageMapping";
import { dummyScriptItems } from "@/dummydata/dummyScripts";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Loader2, Film } from "lucide-react";
import { useAuth } from "@/providers/auth-provider";
import { regionalScripts } from "@/scripts";

const voiceItems: SelectionItem[] = Object.keys(voiceMappings.languages).map(
  (value) => ({ title: value, value })
);

const defaultValues: GenerateFormSchemaType = {
  language: "English",
  script: "",
  customerName: "",
};

type Props = {
  handleGenerateVideo: (data: GenerateFormSchemaType) => void;
};

const GenerateVideoForm = ({ handleGenerateVideo }: Props) => {
  const { user } = useAuth();

  const form = useForm<GenerateFormSchemaType>({
    resolver: zodResolver(GenerateVideoFormSchema),
    defaultValues,
  });

  const slicedArray =
    user.type === "salesperson"
      ? regionalScripts.slice(0, 2)
      : regionalScripts.slice(2, 4);

  const scriptSelectionItems: SelectionItem[] = slicedArray.map((item) => {
    return {
      title: item["Script Details"],
      value: item["S.No"].toString(),
    };
  });

  const onSubmit = (data: GenerateFormSchemaType) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // console.log(data);
        handleGenerateVideo(data);

        resolve(data);
      }, 2000);
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-2"
      >
        <GenerateVideoFormField
          fieldName="language"
          fieldLabel="Language"
          fieldDescription="The language for your video"
          fieldControl={form.control}
          inputType="select"
          selectionItems={{
            placeholder: "Select your language",
            items: voiceItems,
          }}
        />
        <GenerateVideoFormField
          fieldName="script"
          fieldLabel="Script"
          fieldDescription="The script for your video"
          fieldControl={form.control}
          inputType="select"
          selectionItems={{
            placeholder: "Select your script",
            items: scriptSelectionItems,
          }}
        />
        {(form.watch("script") === "2" || form.watch("script") === "4") && (
          <GenerateVideoFormField
            fieldName="customerName"
            fieldLabel="Customer's Name"
            fieldDescription="The name of your customer"
            fieldControl={form.control}
            inputType="text"
          />
        )}
        <CardContent>
          <Button
            className="w-full"
            type="submit"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please Wait
              </>
            ) : (
              <>
                <Film className="mr-2" />
                Generate Video
              </>
            )}
          </Button>
        </CardContent>
      </form>
    </Form>
  );
};

export default GenerateVideoForm;
