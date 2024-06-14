import React from 'react';
import {Separator} from "@/components/ui/separator.jsx";

function OrderDetails({order}) {
    return (
        <div className={'space-y-2'}>
            <div className={'flex flex-col'}>
                <span className={'font-bold'}>Delivering to:</span>
                <span>{order.deliveryDetails.name}</span>
                <span>{order.deliveryDetails.address}, {order.deliveryDetails.city}</span>
            </div>
            <div className={'flex flex-col'}>
                <span className={'font-bold'}>Your Order:</span>
                <ul>
                    {order.cartItems.map((item) => (
                        <li>{item.name} x {item.quantity}</li>
                    ))}
                </ul>
            </div>
            <Separator/>
            <div className={"flex flex-col"}>
                <span className={'font-bold'}>Total Amount:</span>
                <span>Rs.{(order.totalAmount / 100).toFixed(2)}</span>
            </div>
        </div>
    );
}

export default OrderDetails;
