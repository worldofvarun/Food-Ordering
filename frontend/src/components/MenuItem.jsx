import React from 'react';
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.jsx";
import {Button} from "@/components/ui/button.jsx";

function MenuItem({menuItem, onClick}) {
    return (
        <Card className={'cursor-pointer '}>
            <CardHeader>
                <CardTitle>{menuItem.name}</CardTitle>
            </CardHeader>
            <CardContent className={'flex justify-between items-center'}>
                ₹ {(menuItem.price)}
                <Button className={'bg-orange-500'} onClick={() => onClick(menuItem)}>
                    Add to Cart
                </Button>
            </CardContent>
        </Card>
    );
}

export default MenuItem;
