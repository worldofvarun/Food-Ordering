import React from 'react';
import {CardContent, CardHeader, CardTitle} from "@/components/ui/card.jsx";
import {Badge} from "@/components/ui/badge.jsx";
import {Separator} from "@/components/ui/separator.jsx";
import {Trash} from "lucide-react";
import CheckOutButton from "@/components/CheckOutButton.jsx";

function OrderSummary({restaurant, cartItems, onRemove}) {

    function getCount(){
        return cartItems.reduce((acc, currentValue) => {
             return acc + (currentValue.price * currentValue.quantity)
        }, 0)
    }

    return (
        <>
            <CardHeader>
                <CardTitle className={'text-2xl font-bold tracking-tighter flex justify-between'}>
                    <span>Your Order</span>
                    <span> ₹ {getCount() + restaurant.deliveryPrice}</span>
                </CardTitle>
                <CardContent className={'flex flex-col gap-5'}>
                    {cartItems.map((item) => (
                    <div className={"flex justify-between"}>
                        <span>
                           <Badge variant={'outline'} className={'mr-2'}>
                               {item.quantity}
                           </Badge>
                            {item.name}
                        </span>
                        <span className={"flex items-center gap-2"}>
                            ₹ {item.price}
                            <Trash size={20} className={'cursor-pointer text-red-500'} onClick={() => onRemove(item)}/>
                        </span>
                    </div>
                    ))}

                    <div>
                         <Separator/>
                            <span className={'flex justify-between p-2'}>
                                <span> DeliveryPrice: </span>
                                <span>Rs.{restaurant.deliveryPrice}</span>
                            </span>
                         <Separator/>
                    </div>
                    {cartItems.length > 0 && (<CheckOutButton/>)}
                </CardContent>
            </CardHeader>
        </>
    );
}

export default OrderSummary;
