import React from 'react';
import {FormControl, FormItem, FormLabel} from "@/components/ui/form.jsx";
import {Checkbox} from "@/components/ui/checkbox.jsx";

function CuisinesCheckBox({field, cuisine}) {
    return (
        <>
            <FormItem className={'flex flex-row items-center space-x-1 space-y-0 mt-2'}>
                <FormControl>
                    <Checkbox
                        checked={field.value.includes(cuisine)}
                        onCheckedChange={(checked) => {
                            if(checked){
                                field.onChange([...field.value, cuisine])
                            }else{
                                field.onChange(field.value.filter((value) => value !== cuisine))
                            }
                        }}
                    />
                </FormControl>
                <FormLabel>{cuisine}</FormLabel>
            </FormItem>
        </>

    );
}

export default CuisinesCheckBox;