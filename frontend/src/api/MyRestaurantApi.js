import {useAuth0} from "@auth0/auth0-react";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {toast} from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL


//: get
export const useGetRestaurant = () => {
    const { getAccessTokenSilently} = useAuth0();


    const getMyRestaurant = async () => {
        const accessToken = await getAccessTokenSilently();

        const response = await fetch(`${API_BASE_URL}/my/restaurant`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })

        if(!response.ok){
            throw new Error('Something went wrong...')
        }

        return await response.json()
    }

    const {data: currentRestaurant, isLoading, isError, error} = useQuery({
        queryKey: ["fetchMyRestaurant"],
        queryFn: getMyRestaurant,
        retry: false
    })

    return {currentRestaurant, isLoading}
}
//: post
export const useCreateRestaurant = () => {
    const { getAccessTokenSilently } = useAuth0();
    const queryClient= useQueryClient();
    // post request
    const createMyRestaurant = async (formData) => {
        const accessToken = await getAccessTokenSilently();
        const response =  await fetch(`${API_BASE_URL}/my/restaurant`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            body: formData
        });

        if(!response.ok){
            throw new Error("Something went wrong");
        }

        return await response.json();
    }

    const {
        mutateAsync: createRestaurant,
        isPending,
        } = useMutation({
        mutationKey: "createRestaurant",
        mutationFn: (formData) => createMyRestaurant(formData),
        onSuccess: () => {
            toast.success("Restaurant Successfully created!")
            queryClient.invalidateQueries('fetchMyRestaurant')
        },
        onError: error => toast.error(error.toString()),

    });

    return {createRestaurant, isPending}
}
//: put
export const useUpdateRestaurant = () => {
    const { getAccessTokenSilently } = useAuth0();
    const queryClient = useQueryClient();
    // put request
    const updateMyRestaurant = async (formData) => {
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(`${API_BASE_URL}/my/restaurant`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${accessToken}`,

            },
            body: formData
        });

        if(!response.ok){
            throw new Error("Something went wrong");
        }

        return await response.json();
    }

    const {
        mutate: updateRestaurant,
        isPending,
    } = useMutation({
        mutationKey: "updateRestaurant",
        mutationFn: (formData) => updateMyRestaurant(formData),
        onSuccess: () => {
            toast.success("Restaurant Successfully created!")
            queryClient.invalidateQueries('fetchMyRestaurant')
        },
        onError: error => toast.error(error.toString()),

    });

    return {updateRestaurant, isPending}
}
