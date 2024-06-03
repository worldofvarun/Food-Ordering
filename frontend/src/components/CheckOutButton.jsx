import React from 'react';
import {useAuth0} from "@auth0/auth0-react";
import {Button} from "@/components/ui/button.jsx";
import {useLocation} from "react-router-dom";

function CheckOutButton() {
    const {isAuthenticated, loginWithRedirect} = useAuth0()
    const {pathname} = useLocation()

    async function onLogin() {
        return await loginWithRedirect({
            appState: {
                returnTo: pathname
            }
        })
    }

    return (
        <>
            {isAuthenticated ?
                (
                    <Button className={'bg-orange-500'} >
                        Go to CheckOut
                    </Button>
                ) :
                (<Button className={'bg-orange-500'} onClick={onLogin}>
                   Login to CheckOut
                </Button>)}
        </>

    );
}

export default CheckOutButton;
