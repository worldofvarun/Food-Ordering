import React from 'react';
import ManageRestaurantForm from "@/form/restarunt-form/ManageRestaurantForm.jsx";
import {
    useCreateRestaurant,
    useGetRestaurant,
    useGetRestaurantOrders,
    useUpdateRestaurant
} from "@/api/MyRestaurantApi.js";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.jsx";
import OrderItemCard from "@/components/OrderItemCard.jsx";

function ManageRestaurantPage() {
    const {createRestaurant, isPending} = useCreateRestaurant()
    const {currentRestaurant: restaurant} = useGetRestaurant();
    const {updateRestaurant, isPending: isUpdateLoading} = useUpdateRestaurant();
    const isEditing = !!restaurant
    const {orders} = useGetRestaurantOrders()

    return (
        <Tabs defaultValue={'orders'}>
            <TabsList>
                <TabsTrigger value={'orders'}>Orders</TabsTrigger>
                <TabsTrigger value={'managerestaurantform'}>Manage Restaurant</TabsTrigger>
            </TabsList>
            <TabsContent value={'orders'}>
                <div className={'space-y-5 bg-gray-100 p-10 rounded-lg'}>
                    <h2 className={'text-2xl font-bold'}>{orders?.length} active orders</h2>
                    {orders?.map((order) => (
                        <OrderItemCard order={order}/>
                    ))}
                </div>
            </TabsContent>
            <TabsContent value={'managerestaurantform'}>
                <ManageRestaurantForm defaultValues={restaurant} onSave={ isEditing ? updateRestaurant : createRestaurant} isLoading={isEditing ? isUpdateLoading : isPending}/>
            </TabsContent>
        </Tabs>
       //
    );
}

export default ManageRestaurantPage;
