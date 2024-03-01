import { z } from "zod";

const ACCEPTED_FILE_TYPES = [
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
];

export const fileUploadSchema = z.object({
  file: z
    .instanceof(FileList, {message: "Please Select a fileee"})
    .refine((fileList) => fileList.length > 0, "Please Select a File")
    .refine((fileList) => fileList.length === 1, "Please Select only one file")
    .refine(
      (fileList) => ACCEPTED_FILE_TYPES.includes(fileList[0].type),
      "Please Select an excel file only."
    ).transform((fileList)=> fileList[0]),
});

export type FileUpload = z.infer<typeof fileUploadSchema>;
