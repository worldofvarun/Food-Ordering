import React from 'react';
import {Button} from "@/components/ui/button.jsx";
import {useAuth0} from "@auth0/auth0-react";
import {Link} from "react-router-dom";

function MobileNavLinks() {
    const {logout} = useAuth0();
    return (
        <>
            <Link to={'/profile'} className={'flex-1 font-bold hover:bg-orange-500 hover:text-white hover:bg-opacity-75 rounded py-3 px-1'}>user profile</Link>
            <Button className={'flex-1 font-bold bg-orange-500'} onClick={logout}>LogOut</Button>
        </>

    );
}

export default MobileNavLinks;