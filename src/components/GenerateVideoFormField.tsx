import { FC } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormDescription,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CardContent } from "./ui/card";

export type SelectionItem = {
  title: string;
  value: string;
};

export type SelectionItems = {
  placeholder: string;
  items: SelectionItem[];
};

export type FormFieldProps = {
  fieldName: string;
  fieldLabel: string;
  fieldDescription: string;
  fieldControl: any;
} & (
  | {
      inputType: "text";
    }
  | {
      inputType: "select";
      selectionItems: SelectionItems;
    }
);

const GenerateVideoFormField: FC<FormFieldProps> = (props: FormFieldProps) => {
  if (props.inputType === "text") {
    return (
      <CardContent>
        <FormField
          name={props.fieldName}
          control={props.fieldControl}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{props.fieldLabel}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
              <FormDescription>{props.fieldDescription}</FormDescription>
            </FormItem>
          )}
        />
      </CardContent>
    );
  }

  if (props.inputType === "select") {
    return (
      <CardContent>
        <FormField
          name={props.fieldName}
          control={props.fieldControl}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{props.fieldLabel}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      placeholder={props.selectionItems.placeholder}
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {props.selectionItems.items.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
              <FormDescription>{props.fieldDescription}</FormDescription>
            </FormItem>
          )}
        />
      </CardContent>
    );
  }
};

export default GenerateVideoFormField;
