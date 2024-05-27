import {useMutation, useQuery} from "@tanstack/react-query";
import {useAuth0} from "@auth0/auth0-react";
import {toast} from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const useGetMyUser = () => {
    const {getAccessTokenSilently} = useAuth0()
    const getMyUser = async () => {
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(`${API_BASE_URL}/my/user`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            }
        })

        if(!response.ok){
            throw new Error("Fail to Fetch User")
        }

        return await response.json()
    }

    const {data: user,
        isLoading,
        error,} = useQuery({
        queryKey:["fetchCurrentUser"],
        queryFn: getMyUser,
    })

    if(error){
        toast.error(error.toString())
    }

    return {user, isLoading}
}


export const useCreateMyUser = () => {
    const { getAccessTokenSilently} = useAuth0();
    const createMyUser = async (user) => {
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(`${API_BASE_URL}/my/user`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });

        if(!response.ok){
            throw new Error('Error while creating user')
        }
    };
    const {mutateAsync: createUser,
        isError,
        isSuccess,
        isPending} = useMutation({
        mutationFn: (user) => {
            return createMyUser(user)
        },
    })
    return{
        createUser,
        isError,
        isSuccess,
        isPending
    }
}

//: Upload User Profile Request
export const useUpdateMyUser =  () => {
    const {getAccessTokenSilently} = useAuth0()
    //: Request
    const updateMyUser = async (formData) => {
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(`${API_BASE_URL}/my/user`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData),
        })

        if(!response.ok){
            throw new Error('Error while updating user');
        }
        return await response.json();
    }
    //: request mutation
    const {
        mutateAsync: updateUser,
        isPending,
        isSuccess,
        isError,
        error,
        reset,
    } = useMutation({
        mutationFn: (formData) => {
            return updateMyUser(formData);
        }
    })

    if(isSuccess){
        toast.success('User profile updated!')
    }

    if(isError){
        toast.error(error.toString())
        reset()
    }

    return {updateUser, isPending, isSuccess, isError, error, reset}
}

