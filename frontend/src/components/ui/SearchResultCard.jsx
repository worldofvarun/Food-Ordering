import React from 'react';
import {Link} from "react-router-dom";
import {AspectRatio} from "@/components/ui/aspect-ratio.jsx";
import {Banknote, Clock, Dot} from "lucide-react";

function SearchResultCard({restaurant}) {
    return (
        <Link to={'/'} className={'grid md:grid-cols-[2fr_3fr] gap-5 group border p-3 rounded-md shadow'}>

                <AspectRatio ratio={16 / 6}>
                    <img
                        className={'rounded-md w-full h-full object-cover'}
                        src={restaurant.imageUrl}
                        alt={restaurant.restaurantName}/>
                </AspectRatio>

            <div>
                <h3 className={'text-3xl font-semibold'}>{restaurant.restaurantName}</h3>
                <div className={'grid md:grid-cols-2 gap-2'}>
                    <div className={'flex flex-row flex-wrap'}>
                        {restaurant.cuisines.map((cuisine, index) => (
                            <span key={index} className={'flex'}>
                                <span>{cuisine}</span>
                                {index < restaurant.cuisines.length - 1 && (<Dot/>)}
                            </span>
                        ))}
                    </div>
                    <div className={'flex gap-2 flex-col'}>
                        <div className={'flex items-center gap-1 text-green-500'}>
                            <Clock/>
                            {restaurant.estimatedDeliveryTime} mins
                        </div>
                        <div className={'flex items-center gap-1 '}>
                            <Banknote/>
                            Delivery from Rs.{restaurant.deliveryPrice}
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default SearchResultCard;