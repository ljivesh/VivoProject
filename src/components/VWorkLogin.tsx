import { useForm } from "react-hook-form"
import { CardFooter } from "./ui/card"
import { Button } from "./ui/button"
import { Form, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { vWorkLoginSchema } from "@/schemas/LoginSchemas"
import { z } from "zod"
import { UserData } from "@/providers/auth-provider"


type Props = {
    onLoginUser: (data: UserData)=> void
}


const VWorkLogin = ({onLoginUser}: Props)=> {

    const form = useForm({
        resolver: zodResolver(vWorkLoginSchema),
        defaultValues: {
            vWorkId: "",
        }
    });

    const onSubmit = (data: z.infer<typeof vWorkLoginSchema>)=> {
        console.log(data);
        onLoginUser({
            id: data.vWorkId,
            type: 'salesperson',
        });
    }

    return <Form {...form}>

        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-8">
            <FormField control={form.control} name="vWorkId" render={({field})=> (<FormItem>
                <FormLabel>V-Work Id / DMS Id</FormLabel>
                <Input {...field} placeholder="XYZ123456"/>
                <FormDescription>Enter your V-Work or DMS Id</FormDescription>
                <FormMessage />
            </FormItem>)} />
            <CardFooter className="flex justify-center">
            <Button type="submit" className="w-1/2">Login</Button>
          </CardFooter>
        </form>

    </Form>
};

export default VWorkLogin;