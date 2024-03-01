import { useForm } from "react-hook-form"
import { CardFooter } from "./ui/card"
import { Button } from "./ui/button"
import { Form, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { reatailerLoginSchema } from "@/schemas/LoginSchemas"
import { z } from "zod"
import { UserData } from "@/providers/auth-provider"

type Props = {
    onLoginUser: (data: UserData)=> void
}


const RetailerLogin = ({onLoginUser}: Props)=> {

    const form = useForm({
        resolver: zodResolver(reatailerLoginSchema),
        defaultValues: {
            retailerId: "",
        }
    });

    const onSubmit = (data: z.infer<typeof reatailerLoginSchema>)=> {
        console.log(data);
        onLoginUser({
            id: data.retailerId,
            type: 'retailer'
        });
    }

    return <Form {...form}>

        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-8">
            <FormField control={form.control} name="retailerId" render={({field})=> (<FormItem>
                <FormLabel>Retailer Id</FormLabel>
                <Input {...field} placeholder="XYZ123456"/>
                <FormDescription>Enter Retailer's Id</FormDescription>
                <FormMessage />
            </FormItem>)} />
            <CardFooter className="flex justify-center">
            <Button type="submit" className="w-1/2">Login</Button>
          </CardFooter>
        </form>

    </Form>
};

export default RetailerLogin;