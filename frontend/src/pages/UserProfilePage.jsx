import React from 'react';
import UserProfileForm from "@/form/UserProfileForm.jsx";
import {useGetMyUser, useUpdateMyUser} from "@/api/MyUserApi.js";
import {ReloadIcon} from "@radix-ui/react-icons";

function UserProfilePage() {
    const {user, isLoading} = useGetMyUser();
    const {updateUser, isPending} = useUpdateMyUser()

    const onSave = (formData)=> {
        updateUser(formData)
    }

    if(isLoading){
        return (
            <div className={'w-full min-h-screen flex justify-center items-center'}>
                <ReloadIcon className="mr-2 h-12 w-12 animate-spin text-orange-500" />
            </div>)
    }


    return (

            <UserProfileForm currentUser={user} onSave={onSave} isLoading={isPending}/>

    );
}

export default UserProfilePage;