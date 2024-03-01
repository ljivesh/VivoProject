import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog"
import { Input } from "./ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileUpload, fileUploadSchema } from "@/schemas/FileUploadSchema";
import { Form, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { uploadBulkData } from "@/api/upload-bulk-data-api";





type Props = {
    onUpload: ()=> void;
}

const UploadDataDialog = ({onUpload}: Props)=> {

    const form = useForm<FileUpload>({
        resolver: zodResolver(fileUploadSchema),
    });
    const fileRef = form.register("file");

    const onSubmit = async (data: FileUpload)=> {
        const {file} = data;

        const responseData = await uploadBulkData(file);

        if(responseData) {
            console.log("File Upload successfully");
            onUpload();
        } else {
            console.log("File Upload Failed");
        }

    }

    return <DialogContent className="w-3/4 flex flex-col gap-10">
        <DialogHeader>
            <DialogTitle>Upload</DialogTitle>
            <DialogDescription>
                Bulk Upload data of the Retailers.
            </DialogDescription>
        </DialogHeader>
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <FormField name="file" control={form.control} render={()=> (
            <FormItem>
                <FormLabel>File</FormLabel>
                <Input type="file" placeholder="Select your file" {...fileRef} />
                <FormDescription>Data of retailers</FormDescription>
                <FormMessage />
            </FormItem>                
            )} />
            <Button type="submit" >Upload</Button>
        </form>

        </Form>
    </DialogContent>
}

export default UploadDataDialog;