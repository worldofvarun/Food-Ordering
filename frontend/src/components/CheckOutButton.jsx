import React from 'react';
import {useAuth0} from "@auth0/auth0-react";
import {Button} from "@/components/ui/button.jsx";
import {useLocation} from "react-router-dom";
import {Dialog, DialogTrigger} from "@radix-ui/react-dialog";
import {DialogContent} from "@/components/ui/dialog.jsx";
import UserProfileForm from "@/form/user-profile-form/UserProfileForm.jsx";
import {useGetMyUser} from "@/api/MyUserApi.js";

function CheckOutButton({onCheckOut}) {
    const {isAuthenticated, loginWithRedirect} = useAuth0()
    const {user, isLoading: isGetLoading} = useGetMyUser()

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
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className={'bg-orange-500'}>
                                Go to CheckOut
                            </Button>
                        </DialogTrigger>
                        <DialogContent className={'max-w-[425px] md:max-w-[725px] bg-gray-100'}>
                            <UserProfileForm
                                title={'Confirm Delivery Details'}
                                buttonTitle={'Continue to payment'}
                                currentUser={user}
                                onSave={onCheckOut}
                                isLoading={isGetLoading}
                            />
                        </DialogContent>
                    </Dialog>
                ) :
                (<Button className={'bg-orange-500'} onClick={onLogin}>
                   Login to CheckOut
                </Button>)}
        </>

    );
}

export default CheckOutButton;
