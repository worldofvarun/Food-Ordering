import React from 'react';
import {useFormContext} from "react-hook-form";
import {FormControl, FormDescription, FormField, FormItem, FormMessage} from "@/components/ui/form.jsx";
import {Input} from "@/components/ui/input.jsx";
import {AspectRatio} from "@/components/ui/aspect-ratio.jsx";

function ImageSection() {
    const { control, watch } = useFormContext();
    const isImageUrl = watch('imageUrl');


    return (
        <div className={'space-y-2'}>
            <div>
                <h2 className={'text-2xl font-bold'}>Image</h2>
                <FormDescription>
                   Add an image that will be displayed on your restaurant listing in the search result
                </FormDescription>
            </div>



            <div className={'flex flex-col gap-8 md:w-[50%]'}>
                {isImageUrl && (
                    <AspectRatio className={'border border-black rounded-md p-1'} ratio={16/9}>
                        <img className={'w-full h-full rounded-md object-cover'} src={isImageUrl} alt={''}/>
                    </AspectRatio>
                )}
                <FormField control={control} name={'imageFile'} render={({field}) => (
                    <FormItem>
                        <FormControl>
                            <Input
                                className={'bg-white'}
                                type={'file'}
                                accept={'.jpg, .jpeg, .png'}
                                onChange={(event) => field.onChange(event.target.files ? event.target.files[0] : null)}
                            />

                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}>

                </FormField>
            </div>
        </div>
    );
}

export default ImageSection;