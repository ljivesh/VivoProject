import { useAuth } from "@/providers/auth-provider";
import { userInfoSchema } from "@/schemas/UserInfoSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm, useFormContext } from "react-hook-form";
import { Form, FormField, FormItem, FormLabel } from "./ui/form";
import { Input } from "./ui/input";
import { getUserData } from "@/api/user-api";



const UserInfoForm = ()=> {


    const {user} = useAuth();

    const form = useFormContext();

    useEffect(()=> {

        const fetchUserData = async()=> {
            
            const data = await getUserData(user.id);

            if(data) {
                form.setValue('name', data.name || "");
                form.setValue('number', data.number || "");
                user.type === 'retailer' && form.setValue('store', data.store || "");
            }

        };

        fetchUserData();

    }, []);

    return (<form  className="flex justify-between m-6 mb-12 h-12 gap-8">
            <FormField name="name" control={form.control} render={({field})=> (
                <FormItem className="flex flex-col gap-1">
                    <FormLabel className="font-bold">Name</FormLabel>
                    <Input {...field} placeholder="Name"/>
                </FormItem>
            )} />
            <FormField name="number" control={form.control} render={({field})=> (
                <FormItem className="flex flex-col gap-1">
                    <FormLabel className="font-bold">Number</FormLabel>
                    <Input {...field} placeholder="Number"/>
                </FormItem>
            )} />
           {user.type === 'retailer' && <FormField name="store" control={form.control} render={({field})=> (
                <FormItem className="flex flex-col gap-1">
                    <FormLabel className="font-bold">Store Name</FormLabel>
                    <Input {...field} placeholder="Store"/>
                </FormItem>
            )} />}
      </form>)
}

export default UserInfoForm;