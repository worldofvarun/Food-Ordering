import {Button} from "@/components/ui/button.jsx";
import {useAuth0} from "@auth0/auth0-react";
import UserMenu from "@/components/Nav/UserMenu.jsx";

export default function MainNav(){
    const {loginWithRedirect, isAuthenticated, isLoading} = useAuth0()
    return(
        <span>
            { !isLoading
            && isAuthenticated ?
                (<UserMenu/>)
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