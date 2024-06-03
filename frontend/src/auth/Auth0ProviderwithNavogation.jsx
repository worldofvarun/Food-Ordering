import React from 'react';
import {Auth0Provider} from "@auth0/auth0-react";
import {useNavigate} from "react-router-dom";


function Auth0ProviderwithNavogation({children}){
    const navigate = useNavigate();
    // .env check
    const domain = import.meta.env.VITE_AUTH0_DOMAIN
    const clientId = import.meta.env.VITE_AUTH0_CLIENTID
    const redirect_url = import.meta.env.VITE_AUTH0_REDIRECT_URL
    const audience = import.meta.env.VITE_AUTH0_AUDIENCE

    if(!domain || !clientId || !redirect_url || !audience){
        throw new Error('please set the Auth0 .env variables')
    }


    function onRedirectCallback(appState) {
        navigate(appState?.returnTo || '/auth-callback')
    }

    return (
        <Auth0Provider
            domain={domain}
            clientId={clientId}
            authorizationParams={{
                redirect_uri: redirect_url,
                audience: audience,
            }}
            onRedirectCallback={onRedirectCallback}
        >
            {children}

        </Auth0Provider>
    );
}

export default Auth0ProviderwithNavogation;
