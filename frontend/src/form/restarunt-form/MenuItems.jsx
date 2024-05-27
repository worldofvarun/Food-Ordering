import React from 'react';
import {useFormContext} from "react-hook-form";
import {FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.jsx";
import {Input} from "@/components/ui/input.jsx";
import {Button} from "@/components/ui/button.jsx";

function MenuItems({index, removeIndex}) {
    const { control, watch } = useFormContext();

    return (
        <div className={'flex flex-row items-end gap-2'}>

            <FormField
                control={control}
                name={`menuItems.${index}.name`}
                render={({field}) => (
                    <FormItem>
                        <FormLabel className={'flex items-center gap-1'}>Name <FormMessage/></FormLabel>
                        <Input {...field} placeholder={"pizza"}/>
                    </FormItem>
                )}
            />

            <FormField
                control={control}
                name={`menuItems.${index}.price`}
                render={({field}) => (
                    <FormItem>
                        <FormLabel className={'flex items-center gap-1'}>Price <FormMessage/></FormLabel>
                        <Input {...field} placeholder={"8.00"}/>
                    </FormItem>
                )}
            />

            <Button className={'bg-red-900'} type="button" onClick={removeIndex}>
                Remove Item
            </Button>


        </div>
    );
}

export default MenuItems;