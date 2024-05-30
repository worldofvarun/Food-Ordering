import React, {useState} from 'react';
import {useParams} from "react-router-dom";
import SearchBar from "@/components/SearchBar.jsx";
import {useSearchRestaurants} from "@/api/RestaurantApi.js";
import SearchResultInfo from "@/components/SearchResultInfo.jsx";
import SearchResultCard from "@/components/ui/SearchResultCard.jsx";
import PageSelector from "@/components/PageSelector.jsx";
import CuisineFilter from "@/components/CuisineFilter.jsx";
import {cuisines} from "@/utils.js";

function SearchPage() {
    const [searchQueryState, setSearchQuery] = useState({
        searchQuery: "",
        cuisinesSelected: [],
        page: 1,
        sortBy: "bestMatch",
    });
    const { city } = useParams()
    const {searchResult, isLoading} = useSearchRestaurants(city, searchQueryState);
    const [isExpand, setisExpand] = useState(false);

    function handelOnSearchSubmit(formData){
        setSearchQuery((prevState) => ({
            ...prevState,
            searchQuery: formData.searchQuery

        }))
    }

    function handelOnSortOption(option){
        setSearchQuery((prevState) => ({
            ...prevState,
            sortBy: option

        }))
    }

    function handelonSetPage(page){
        setSearchQuery((prevState) => ({
            ...prevState,
            page: page

        }))
    }

    function handelOnReset(){
        setSearchQuery((prevState) => ({
            ...prevState,
            searchQuery: "",
            page: 1


        }))
    }

    function handelFilterReset() {
        setSearchQuery((prevState) => ({
            ...prevState,
           cuisinesSelected: []


        }))
    }

    function handelOnCuisines(cuisinesSelected){
        setSearchQuery((prevState) => ({
            ...prevState,
            cuisinesSelected: cuisinesSelected
        }))
    }

    if(isLoading){
        return <span>Loading...</span>
    }

    if (!searchResult?.data || !city){
        return <span className={'flex-1'}>no restaurant found</span>
    }

    return (
        <div className={'grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5'}>
            <div id={'cuisine-filter'}>
                <CuisineFilter
                    onReset={handelFilterReset}
                    cuisines={cuisines}
                    selectedCuisines={searchQueryState.cuisinesSelected}
                    onChange={handelOnCuisines}
                    isExpand={isExpand}
                    onExpandedClick={() => setisExpand((prevIsExpand) => !prevIsExpand)}
                />
            </div>
            <div id={'main-content'} className={'flex flex-col gap-5'}>
                <div>
                    <SearchBar
                        searchQuery={searchQueryState.searchQuery}
                        placeholder={'Search by Restaurant or Cuisines'}
                        onReset={handelOnReset}
                        onSubmit={handelOnSearchSubmit}/>
                </div>

                <SearchResultInfo
                    city={city}
                    total={searchResult.pagination.total}
                    sortOption={searchQueryState.sortBy}
                    onSortChange={handelOnSortOption}
                />
                {searchResult.data.map((restaurant, index) => (
                    <SearchResultCard key={index} restaurant={restaurant}/>
                ))}
                <PageSelector
                    page={searchResult.pagination.page}
                    pages={searchResult.pagination.pages}
                    onPageChange={handelonSetPage}
                />
            </div>
        </div>
    );
}

export default SearchPage;
