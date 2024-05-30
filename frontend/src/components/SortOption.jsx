import React from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.jsx";
import {Button} from "@/components/ui/button.jsx";


const SORT_OPTIONS = [
    {
        label: 'Delivery Price',
        value: 'deliveryPrice',
    },
    {
        label: 'Estimated Delivery Time',
        value: 'estimatedDeliveryTime',
    },
    {
        label: 'Best Match',
        value: 'bestMatch',
    }
]
function SortOption({onChange, sortOption}) {
    const SeletedSortOption = SORT_OPTIONS
        .find((option) => option.value === sortOption)?.label || SORT_OPTIONS[0].label
    return (
        <DropdownMenu>
                <DropdownMenuTrigger className={'cursor-pointer'}>
                    <Button variant={'outline'}>
                        Sort By: {SeletedSortOption}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    {SORT_OPTIONS.map((option) => (
                        <DropdownMenuItem className={'cursor-pointer'} onClick={() => onChange(option.value)}>
                            {option.label}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default SortOption;
