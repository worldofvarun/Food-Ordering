import React from 'react';
import {FormDescription, FormField, FormItem, FormMessage} from "@/components/ui/form.jsx";
import {useFormContext} from "react-hook-form";
import CuisinesCheckBox from "@/form/restarunt-form/CuisinesCheckBox.jsx";
import {cuisines} from "@/utils.js";

function CuisinesSection() {

    const { control } = useFormContext()
    return (
        <div className={'space-y-2'}>
            <div>
                <h2 className={'text-2xl font-bold'}>Cuisines</h2>
                <FormDescription>
                    Create your menu and give each time a name ans price
                </FormDescription>
            </div>
            <FormField
                control={control}
                name={"cuisines"}
                render={({field}) => (
                    <FormItem>
                        <div className={'grid md:grid-cols-5'}>
                            {cuisines.map((name, index) => (
                                <CuisinesCheckBox key={index} cuisine={name} field={field}/>
                            ))}

                        </div>
                    </FormItem>
                )}/>
            <FormMessage/>
        </div>
    );
}

export default CuisinesSection;
