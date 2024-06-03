import React from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.jsx";
import {Dot} from "lucide-react";


function RestaurantInfo({restaurantDetails}) {
    return (
        <Card className={'border-slate-400'}>
            <CardHeader>
                <CardTitle>{restaurantDetails.restaurantName}</CardTitle>
                <CardDescription>{restaurantDetails.city}, {restaurantDetails.country}</CardDescription>
            </CardHeader>
            <CardContent className={'flex'}>
                    {restaurantDetails.cuisines.map((cuisine, index) => (
                            <span className={'flex items-center'}>{cuisine} {index < restaurantDetails.cuisines.length - 1 && (<Dot/>)}</span>
                        )
                    )}
            </CardContent>
        </Card>
    );
}

export default RestaurantInfo;
