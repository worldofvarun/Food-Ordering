import React, {useEffect, useState} from 'react';
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.jsx";
import {Separator} from "@/components/ui/separator.jsx";
import {Badge} from "@/components/ui/badge.jsx";
import {Label} from "@/components/ui/label.jsx";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select.jsx";
import {ORDER_STATUS} from "@/components/OrderStatusHeader.jsx";
import {useUpdateOrderStatus} from "@/api/MyRestaurantApi.js";

function OrderItemCard({order}) {
    const {updateStatus, isPending} = useUpdateOrderStatus()
    const [status, setStatus] = useState(order.status)
    const handelSubmit = async (newStatus) => {
        await updateStatus({orderId: order._id, status: newStatus});
        setStatus(newStatus)
    }

    useEffect(() => {
        setStatus(order.status)
    }, [order.status]);

    const getTime = () => {
        const orderTime = new Date(order.createdAt);
        const hour = orderTime.getHours()
        const minutes = orderTime.getMinutes()
        const paddedMin = orderTime < 10? `0${minutes}` : minutes
        return `${hour} : ${paddedMin}`
    }

    return (
        <Card className={'w-full p-2 bg-white rounded-lg'}>
            <CardHeader>
                <CardTitle className={'grid md:grid-cols-4 gap-4 justify-between mb-3'}>
                    <div>
                        Customer Name:
                        <span className={'ml-2 font-normal'}>{order.deliveryDetails.name}</span>
                    </div>
                    <div>
                        Address Details:
                        <span className={'ml-2 font-normal'}>
                            {order.deliveryDetails.address}, {order.deliveryDetails.city}
                        </span>
                    </div>
                    <div>
                        Booked time:
                        <span className={'ml-2 font-normal'}>
                            {getTime()}
                        </span>
                    </div>
                    <div>
                        Total Amount:
                        <span className={'ml-2 font-normal'}>
                            Rs.{(order.totalAmount / 100).toFixed(2)}
                        </span>
                    </div>
                </CardTitle>
                <Separator/>
                <CardContent className={'flex flex-col gap-6'}>

                    <div className={'flex flex-col gap-2'}>
                        {order.cartItems.map((cartItem) => (
                            <span className={'flex flex-row items-center'}>
                                <Badge variant={'outline'} className={'mr-2'}>
                                    {cartItem.quantity} x
                                </Badge>
                                {cartItem.name}
                            </span>
                        ))}
                    </div>
                    <div className={'flex flex-col space-y-1'}>
                        <Label htmlFor={'status'}>
                            What is the status of this order?
                        </Label>
                        <Select
                            value={status}
                            disabled={isPending}
                            onValueChange={(value) => handelSubmit(value)}>
                            <SelectTrigger id={'status'}>
                                <SelectValue defaultValue={`${order.status}`} placeholder={'Select status'}/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {ORDER_STATUS.map((status) => (
                                        <SelectItem value={status.value}>{status.label}</SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                </CardContent>
            </CardHeader>
        </Card>
    );
}

export default OrderItemCard;
