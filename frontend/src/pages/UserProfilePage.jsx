import React from 'react';
import UserProfileForm from "@/form/user-profile-form/UserProfileForm.jsx";
import {useGetMyUser, useUpdateMyUser} from "@/api/MyUserApi.js";
import {ReloadIcon} from "@radix-ui/react-icons";

function UserProfilePage() {
    const {user} = useGetMyUser();
    const {updateUser, isPending} = useUpdateMyUser()

    const onSave = (formData)=> {
        updateUser(formData)
    }




    return (

            <UserProfileForm currentUser={user} onSave={onSave} isLoading={isPending}/>

    );
}

export default UserProfilePage;