import React from 'react';
import {Link} from "react-router-dom";
import SortOption from "@/components/SortOption.jsx";

function SearchResultInfo({total, city, sortOption, onSortChange}) {
    return (
        <div className={'text-xl font-bold flex flex-col gap-3 justify-between lg:items-center lg:flex-row'}>
            <span>
                {total} Restaurant found in {city} {""}
                <Link to={'/'} className={'text-sm font-semibold underline cursor-pointer text-blue-500'}>Change Location</Link>
            </span>
            <SortOption sortOption={sortOption} onChange={onSortChange}/>
        </div>
    );
}

export default SearchResultInfo;
