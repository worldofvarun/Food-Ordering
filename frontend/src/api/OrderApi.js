import {useAuth0} from "@auth0/auth0-react";
import {useMutation} from "@tanstack/react-query";


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const useCheckOutSessionRequest = () => {
    const { getAccessTokenSilently } = useAuth0()
    const createCheckOutSession = async (checkoutSession) => {
        const accessToken =  await getAccessTokenSilently();
        const response = await fetch(`${API_BASE_URL}/order/checkout/create-checkout-session`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json"

            },
            body: JSON.stringify(checkoutSession),
        });


        if(!response.ok){
            throw  new Error("Unable to Create checkout Session")
        }

        return response.json()
    }

    const {mutateAsync: createcheckoutsession, reset, isPending} = useMutation({
        mutationFn: (checkoutSession) => createCheckOutSession(checkoutSession),
    })

    return {createcheckoutsession, isPending}

}
