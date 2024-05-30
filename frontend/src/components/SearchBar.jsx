import React, {useEffect} from 'react';
import {z} from 'zod'
import {useForm} from "react-hook-form";
import {Form, FormControl, FormField, FormItem} from "@/components/ui/form.jsx";
import {Search} from "lucide-react";
import {Input} from "@/components/ui/input.jsx";
import {Button} from "@/components/ui/button.jsx";
import {zodResolver} from "@hookform/resolvers/zod";

const formSchema = z.object({
    searchQuery: z.string({
        required_error: "Restaurant is required"
    }).min(1)
})


function SearchBar({onSubmit, onReset, placeholder, searchQuery}) {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            ...searchQuery
        }
    })


    useEffect(() => {
        form.reset( { searchQuery })
    }, [form, searchQuery]);

    function handelReset() {
        form.reset({
            searchQuery: ""
        })

        if(onReset){
            onReset()
        }
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}
            className={`flex items-center flex-1 gap-3 justify-center flex-row border-2 rounded-full mx-3 p-2 ${form.formState.errors.searchQuery && "border-red-500"}`}
            >
                <Search strokeWidth={2.5} size={30} className={'ml-1 text-orange-500 hidden md:block'}/>
                <FormField
                    control={form.control}
                    name={"searchQuery"}
                    render={({field}) => (
                        <FormItem className={'flex-1'}>
                            <FormControl>
                                <Input {...field} className={'bg-white border-none shadow-none focus-visible:ring-0 '} placeholder={placeholder} />
                            </FormControl>
                        </FormItem>
                    )}
                />

                    <Button onClick={handelReset} type={'button'} variant={'outline'}>
                        Reset
                    </Button>

                <Button type={'submit'} className={'rounded-full bg-orange-500'}> Search </Button>
            </form>
        </Form>
    );
}

export default SearchBar;