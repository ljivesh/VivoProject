import { z } from "zod";


const GenerateVideoFormSchema = z
  .object({
    language: z.enum(["Bengali", "Gujarati", "Hindi", "Kannada", "Marathi", "Tamil", "Telugu", "English"], {required_error: "Please Select a Language."}),
    script: z.string().min(1, { message: "Plese select your script" }),
    customerName: z.string().optional(),
  })
  .required();

export type GenerateFormSchemaType = z.infer<typeof GenerateVideoFormSchema>;

export default GenerateVideoFormSchema;
