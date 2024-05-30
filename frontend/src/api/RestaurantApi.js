import {useQuery} from "@tanstack/react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const useSearchRestaurants = (city, searchQuery) => {
    const getRestaurants = async () => {
        const params = new URLSearchParams();
        params.set('search', searchQuery.searchQuery)
        params.set('page', searchQuery.page)
        params.set('cuisines', searchQuery.cuisinesSelected)
        params.set('sortBy', searchQuery.sortBy)
        const response = await fetch(`${API_BASE_URL}/restaurant/search/${city}?${params.toString()}`);
        if(!response.ok) {
            throw new Error('Restaurant not found.');
        }

        return await response.json();
    }

    const {data: searchResult, isLoading} = useQuery({
        queryKey: ["searchRestaurants", searchQuery],
        queryFn: getRestaurants,
        enabled: !!city,
    })

    return {searchResult, isLoading};
}
