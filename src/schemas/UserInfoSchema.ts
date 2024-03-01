import { z } from "zod";


export const userInfoSchema = z.object({
    name: z.string(),
    number: z.string(),
    storeName: z.string().optional()
});

export type UserInfo = z.infer<typeof userInfoSchema>;