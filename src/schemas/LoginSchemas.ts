import { z } from "zod";



export const vWorkLoginSchema = z.object({
    vWorkId: z.string().min(1, {message: "Please Enter your V-Work ID"}),
});

export const reatailerLoginSchema = z.object({
    retailerId: z.string().min(1, {message: "Please Enter the Retailer's ID"}),
});