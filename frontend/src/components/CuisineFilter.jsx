import React from 'react';
import {Input} from "@/components/ui/input.jsx";
import {Check, ChevronDown, ChevronUp} from "lucide-react";
import {Button} from "@/components/ui/button.jsx";

function CuisineFilter({cuisines, selectedCuisines, onChange, isExpand, onExpandedClick, onReset}) {

    const handleCuisinesChange = (event) => {
        const clickedCuisine = event.target.value;
        const isChecked = event.target.checked;
        const newCuisinesList = isChecked
            ? [...selectedCuisines, clickedCuisine]
            : selectedCuisines.filter((cuisine) => cuisine !== clickedCuisine);
        onChange(newCuisinesList);
    };

    return (
        <>
            <div className={'flex justify-between items-center px-2 mb-2'}>
                <h3>Filter By Cuisine</h3>
                <Button variant={'link'} className={'text-blue-500 underline'} onClick={onReset}>
                    Reset Filter
                </Button>
            </div>
                <div className={'space-y-2 flex flex-col'}>
                    {cuisines.slice(0, isExpand ? cuisines.length : 7).map((cuisine) => {
                        const isSeleted = selectedCuisines.includes(cuisine);
                        return (
                            <div className={'flex'} key={cuisine}>
                                <Input
                                       id={`${cuisine}_label`}
                                       type={'checkbox'}
                                       className={'hidden'}
                                       checked={isSeleted}
                                       value={cuisine}
                                       onChange={() => handleCuisinesChange(event) }
                                />

                                <label htmlFor={`${cuisine}_label`}
                                       className={`flex flex-1 gap-2 items-center cursor-pointer text-sm border-2 rounded-full px-4 py-2 ${isSeleted ? 'border-green-500 text-green-500' : 'border-gray-500'}`}>
                                    {isSeleted && <Check className={'text-green-500'}/>}  {cuisine}
                                </label>
                            </div>
                        );
                    })}

                    <Button
                        onClick={onExpandedClick}
                        variant={'link'}
                        className={'mt-4 flex-1'}>
                        {isExpand ? <span className={'flex flex-row items-center'}>View Less <ChevronUp/></span> :
                            <span className={'flex flex-row items-center'}>View More <ChevronDown/></span>}
                    </Button>

                </div>

        </>
    );
}

export default CuisineFilter;
