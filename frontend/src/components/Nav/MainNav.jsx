import {Button} from "@/components/ui/button.jsx";
import {useAuth0} from "@auth0/auth0-react";
import UserMenu from "@/components/Nav/UserMenu.jsx";
import {Link} from "react-router-dom";


export default function MainNav(){
    const {loginWithRedirect, isAuthenticated, isLoading} = useAuth0()
    return(
        <span className={'flex space-x-2 items-center'}>
            { !isLoading
            && isAuthenticated ?
                (
                    <>
                        <Link className={'font-bold hover:text-orange-500'} to={'/order-status'}>Order Status</Link>
                        <UserMenu/>
                    </>
                )
                : (
                <Button
                    variant={'ghost'}
                    className={'font-bold hover:text-orange-500 hover:bg-white'}
                    onClick={async () => await loginWithRedirect()}
                >
                    Login
                </Button>
            )}
        </span>

    );
}
