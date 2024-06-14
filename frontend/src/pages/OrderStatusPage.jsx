import React from 'react';
import {useGetMyOrders} from "@/api/OrderApi.js";
import OrderStatusHeader from "@/components/OrderStatusHeader.jsx";
import OrderDetails from "@/components/OrderDetails.jsx";
import {AspectRatio} from "@/components/ui/aspect-ratio.jsx";

function OrderStatusPage() {
    const {orders , isLoading} = useGetMyOrders()

    if(isLoading){
        return<span>Loading...</span>
    }

    if(!orders || orders.length === 0){
        return <span>No Orders Found</span>
    }

    return (
        <div className={'space-y-10'}>
            {orders.map((order) => (
                <div className={'space-y-10 bg-gray-100 p-10 rounded-lg'}>
                    <OrderStatusHeader order={order} />
                    <div className={'grid gap-10 md:grid-cols-2'}>
                        <OrderDetails order={order}/>
                        <AspectRatio ratio={16/5}>
                            <img
                                alt={order.restaurant.name}
                                src={order.restaurant.imageUrl}
                                className={'rounded-md h-full w-full object-cover'}
                            />
                        </AspectRatio>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default OrderStatusPage;
