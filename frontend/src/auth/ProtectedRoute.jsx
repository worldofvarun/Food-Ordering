import React from 'react';
import {useAuth0} from "@auth0/auth0-react";
import {Navigate, Outlet} from "react-router-dom";
import {ReloadIcon} from "@radix-ui/react-icons";

function ProtectedRoute() {
    const {isAuthenticated, isLoading} = useAuth0();

    if(isLoading){
        return (
            <div className={'w-full min-h-screen flex justify-center items-center'}>
                <ReloadIcon className="mr-2 h-12 w-12 animate-spin text-orange-500" />
            </div>)
    }
    return (
        <>
            {isAuthenticated? <Outlet/> : <Navigate to={'/'} replace/>}
        </>
    );
}

export default ProtectedRoute;