import React, {useEffect} from 'react';
import {coerce, z} from 'zod'
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel} from "@/components/ui/form.jsx";
import {Input} from "@/components/ui/input.jsx";
import DetailsSectionForm from "@/form/restarunt-form/DetailsSectionForm.jsx";
import {Separator} from "@/components/ui/separator.jsx";
import CuisinesSection from "@/form/restarunt-form/CuisinesSection.jsx";
import MenuSection from "@/form/restarunt-form/MenuSection.jsx";
import ImageSection from "@/form/restarunt-form/ImageSection.jsx";
import {Button} from "@/components/ui/button.jsx";
import {LoadingButton} from "@/components/LoadingButton.jsx";

const formSchema = z.object({
    restaurantName: z.string(),
    city: z.string(),
    country: z.string(),
    deliveryPrice: z.coerce.number(),
    estimatedDeliveryTime: z.coerce.number(),
    cuisines: z.array(z.string()).nonempty(),
    menuItems: z.array(
        z.object({
            name: z.string().min(1, "name is required"),
            price: z.coerce.number().min(1, "price is required"),
        })
    ),
    imageUrl: z.string().optional(),
    imageFile: z.instanceof(File).optional()
}).refine((data) =>  data.imageUrl || data.imageFile, {
    message: "Either image URL or image File must be provided",
    path: ["imageFile"],
})

function ManageRestaurantForm({onSave, isLoading, defaultValues}) {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            ...defaultValues,
            cuisines: [],
            menuItems: [{name: '', price: 0}]

        }
    })

    useEffect(() => {
        if(!defaultValues){
            return;
        }
        form.reset()
        form.reset(defaultValues)

    }, [defaultValues, form]);




    const onSubmit = (RestaurantFormData) => {
        const formData = new FormData();
        formData.append('restaurantName', RestaurantFormData.restaurantName);
        formData.append('city', RestaurantFormData.city);
        formData.append('country', RestaurantFormData.country);
        formData.append('deliveryPrice', RestaurantFormData.deliveryPrice);
        formData.append('estimatedDeliveryTime', RestaurantFormData.estimatedDeliveryTime);

        RestaurantFormData.cuisines.map((cuisine, index) => {
            formData.append(`cuisines[${index}]`, cuisine)
        })

        RestaurantFormData.menuItems.map((item, index) => {
            formData.append(`menuItems.${index}.name`, item.name);
            formData.append(`menuItems.${index}.price`, item.price);
        })

        if(RestaurantFormData.imageFile) formData.append('imageFile', RestaurantFormData.imageFile);
        onSave(formData)

    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 bg-gray-100 rounded-lg p-10">
                <DetailsSectionForm/>
                <Separator/>
                <CuisinesSection/>
                <Separator />
                <MenuSection/>
                <Separator />
                <ImageSection/>
                {isLoading ? (<LoadingButton/>) :
                    (<Button className={'bg-orange-500'}>
                        Submit
                    </Button>)
                }
            </form>
        </Form>
    );
}

export default ManageRestaurantForm;