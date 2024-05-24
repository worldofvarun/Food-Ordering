import zod from 'zod';
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

import {Input} from "@/components/ui/input.jsx";
import {LoadingButton} from "@/components/LoadingButton.jsx";
import {Button} from "@/components/ui/button.jsx";
import {useEffect} from "react";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "../components/ui/form.jsx";

const formSchema = zod.object({
    email: zod.string().optional(),
    name: zod.string().min(1, "name is required"),
    address: zod.string().min(1, "address is required"),
    city: zod.string().min(1, "city is required"),
    country: zod.string().min(1, "country is required"),
})

function UserProfileForm({onSave, isLoading, currentUser}) {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: currentUser
    });

    useEffect(() => {
        form.reset(currentUser)
    }, [form, currentUser]);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSave)} className="space-y-4 bg-gray-100 rounded-lg p-10">
                <div>
                    <h2 className={'text-2xl font-bold'}>User Profile</h2>
                </div>

                    <FormDescription>
                        View and Change your profile information here
                    </FormDescription>
                    <FormField control={form.control} name={"email"} render={({field}) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input {...field} disabled className={'bg-white'}/>
                            </FormControl>
                        </FormItem>
                    )}>
                    </FormField>

                    <FormField control={form.control} name={"name"} render={({field}) => (
                        <FormItem>
                            <FormLabel>name</FormLabel>
                            <FormControl>
                                <Input {...field} className={'bg-white'}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}>
                    </FormField>


                    <div className={'grid md:grid-cols-3 gap-4'}>

                        <FormField
                            control={form.control}
                            name={"address"}
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>address</FormLabel>
                                <FormControl>
                                    <Input {...field}  className={'bg-white'}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}>
                        </FormField>

                        <FormField
                            control={form.control}
                            name={"country"}
                            render={
                            ({ field }) => (
                                <FormItem>
                                    <FormLabel>country</FormLabel>
                                    <FormControl>
                                        <Input {...field}  className={'bg-white'}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                        )}>
                        </FormField>

                        <FormField
                            control={form.control}
                            name={"city"}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>city</FormLabel>
                                    <FormControl>
                                        <Input {...field} className={'bg-white'}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                        )}>
                        </FormField>
                    </div>

                {/* submit button */}
                {isLoading ? (<LoadingButton/>) : (
                    <Button type={'submit'} className={'bg-orange-500'}>
                        Submit
                    </Button>
                )}
            </form>
        </Form>
    );
}

export default UserProfileForm;