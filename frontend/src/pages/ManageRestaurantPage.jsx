import React from 'react';
import ManageRestaurantForm from "@/form/restarunt-form/ManageRestaurantForm.jsx";
import {useCreateRestaurant, useGetRestaurant, useUpdateRestaurant} from "@/api/MyRestaurantApi.js";

function ManageRestaurantPage() {
    const {createRestaurant, isPending} = useCreateRestaurant()
    const {currentRestaurant: restaurant} = useGetRestaurant();
    const {updateRestaurant, isPending: isUpdateLoading} = useUpdateRestaurant();
    const isEditing = !!restaurant


    return (
       <ManageRestaurantForm defaultValues={restaurant} onSave={ isEditing ? updateRestaurant : createRestaurant} isLoading={isEditing ? isUpdateLoading : isPending}/>
    );
}

export default ManageRestaurantPage;