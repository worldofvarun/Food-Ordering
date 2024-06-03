import React, {useState} from 'react';
import {useParams} from "react-router-dom";
import {useGetRestaurant} from "@/api/RestaurantApi.js";
import {AspectRatio} from "@/components/ui/aspect-ratio.jsx";
import RestaurantInfo from "@/components/RestaurantInfo.jsx";
import MenuItem from "@/components/MenuItem.jsx";
import {Card} from "@/components/ui/card.jsx";
import OrderSummary from "@/components/OrderSummary.jsx";


function DetailsPage() {
    const {restaurant_id} = useParams()
    const {restaurantDetails, isLoading} = useGetRestaurant(restaurant_id)
    const [cartItems, setCartItems] = useState(() => {
        const storedCartItems =  sessionStorage.getItem(`cart_items_${restaurant_id}`)
        return storedCartItems ? JSON.parse(storedCartItems) : []
    })

    function onAddToCart(item){
        setCartItems((prevCartItems) => {
            const itemExists = prevCartItems.find(cartItem => cartItem._id === item._id);
            let updatedCartItems;
            if (itemExists) {
                updatedCartItems = prevCartItems.map(cartItem =>
                    cartItem._id === item._id
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                );
            } else {
                // Add the new item with quantity 1
                updatedCartItems = [...prevCartItems, { ...item, quantity: 1 }];
            }

            sessionStorage.setItem(`cart_items_${restaurant_id}`, JSON.stringify(updatedCartItems))
            return updatedCartItems
        });



    }

    function onRemoveFromCart(item){
        let updatedCartItems;
        setCartItems((prevState) => {
            updatedCartItems = prevState.filter((cartItem) => cartItem._id !== item._id);
            sessionStorage.setItem(`cart_items_${restaurant_id}`, JSON.stringify(updatedCartItems))
            return updatedCartItems
        });
    }

    if(isLoading || !restaurantDetails) {
        return <span>Loading...</span>
    }
    return (
        <div className={'flex flex-col gap-10'}>
            <AspectRatio ratio={16/ 5}>
                <img src={restaurantDetails.imageUrl} className={'rounded-md object-cover h-full w-full'} alt={restaurantDetails.restaurantName}/>
            </AspectRatio>
            <div className={"grid md:grid-cols-[4fr_2fr] gap-5 md:px-32"}>
                <div className={'flex flex-col gap-4'}>
                    <RestaurantInfo restaurantDetails={restaurantDetails}/>
                    <span className={'text-2xl font-bold tracking-tighter'}>Menu</span>
                    {restaurantDetails.menuItems.map((menuItem, index) => (
                        <MenuItem key={index} menuItem={menuItem} onClick={onAddToCart}/>
                    ))}
                </div>

                    <Card className={"h-fit"}>
                        <OrderSummary restaurant={restaurantDetails} cartItems={cartItems} onRemove={onRemoveFromCart}/>
                    </Card>

            </div>
        </div>
    );
}

export default DetailsPage;
