import React from 'react';
import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.jsx";
import {Input} from "@/components/ui/input.jsx";
import {useFormContext} from "react-hook-form";

function DetailsSectionForm() {
    const { control } = useFormContext()
    return (
        <div className={'space-y-2'}>
            <div>
                <h2 className={'text-2xl font-bold'}>Manage Restaurant</h2>
                <FormDescription>
                    Enter the details about your restaurant
                </FormDescription>
            </div>

            <FormField control={control} name={"restaurantName"} render={({field}) => (
                <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                        <Input {...field} className={"bg-white"}/>
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            )}/>

            <div className={'flex flex-col md:flex-row gap-4'}>
                <FormField control={control} name={"city"} render={({field}) => (
                    <FormItem className={'flex-1'}>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                            <Input {...field} className={"bg-white"}/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}/>

                <FormField control={control} name={"country"} render={({field}) => (
                    <FormItem className={'flex-1'}>
                        <FormLabel>Country</FormLabel>
                        <FormControl>
                            <Input {...field} className={"bg-white"}/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}/>
            </div>

            <FormField  control={control} name={"deliveryPrice"} render={({field}) => (
                <FormItem className={"max-w-[30%]"}>
                    <FormLabel>Delivery Price (₹)</FormLabel>
                    <FormControl>
                        <Input {...field} className={"bg-white"}/>
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            )}/>

            <FormField  control={control} name={"estimatedDeliveryTime"} render={({field}) => (
                <FormItem className={"max-w-[30%]"}>
                    <FormLabel>Estimated Delivery Time (min)</FormLabel>
                    <FormControl>
                        <Input {...field} className={"bg-white"}/>
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            )}/>
        </div>
    );
}

export default DetailsSectionForm;