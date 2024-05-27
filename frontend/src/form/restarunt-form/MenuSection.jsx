import React from 'react';
import {FormDescription, FormField, FormItem} from "@/components/ui/form.jsx";
import {useFieldArray, useFormContext} from "react-hook-form";
import {Button} from "@/components/ui/button.jsx";
import MenuItems from "@/form/restarunt-form/MenuItems.jsx";

function MenuSection() {
    const { control, watch} = useFormContext()

    const {fields, append, remove} = useFieldArray({
        control: control,
        name: "menuItems"
    });

    return (
        <div className={'space-y-2'}>
            <div>
                <h2 className={'text-2xl font-bold'}>Menu</h2>
                <FormDescription>
                    Create your menu and give each time a name ans price
                </FormDescription>
            </div>

            <FormField  control={control} name={'menuItems'} render={() => (
                <FormItem className={'flex flex-col gap-2'}>
                    {fields.map((_, index) => (
                        <MenuItems key={index} index={index} removeIndex={() => remove(index)}/>
                    ))}
                </FormItem>
            )}/>
            <Button type={'button'} onClick={() => append({name: "", price: ""})}>
                Add New Item
            </Button>
        </div>
    );
}

export default MenuSection;