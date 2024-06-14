import React from 'react';
import {Progress} from "@/components/ui/progress.jsx";


export const ORDER_STATUS= [
    { label: "Placed", value: "placed", progressValue: 0 },
    {
        label: "Awaiting Restaurant Confirmation",
        value: "paid",
        progressValue: 25,
    },
    { label: "In Progress", value: "inProgress", progressValue: 50 },
    { label: "Out for Delivery", value: "outForDelivery", progressValue: 75 },
    { label: "Delivered", value: "delivered", progressValue: 100 },
];

function OrderStatusHeader({order}) {

    const getExpectedDelivery = () => {
        const created = new Date(order.createdAt);

        created.setMinutes(
            created.getMinutes() + order.restaurant.estimatedDeliveryTime
        );

        const hours = created.getHours();
        const minutes = created.getMinutes();

        const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;

        return `${hours}:${paddedMinutes}`;
    };

    const getOrderStatusInfo = () => {
        return (
            ORDER_STATUS.find((o) => o.value === order.status) || ORDER_STATUS[0]
        );
    };

    return (
        <>
            <h1 className="text-4xl font-bold tracking-tighter flex flex-col gap-5 md:flex-row md:justify-between">
                <span> Order Status: {getOrderStatusInfo().label}</span>
                <span> Expected by: {getExpectedDelivery()}</span>
            </h1>
            <Progress
                className="animate-pulse"
                value={getOrderStatusInfo().progressValue}
            />
        </>
    );
}

export default OrderStatusHeader;
