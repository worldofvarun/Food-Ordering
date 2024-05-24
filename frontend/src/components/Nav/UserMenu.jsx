import React from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.jsx";
import {CircleUserRound} from "lucide-react";
import {useAuth0} from "@auth0/auth0-react";
import {Link} from "react-router-dom";
import {Separator} from "@/components/ui/separator.jsx";
import {Button} from "@/components/ui/button.jsx";

function UserMenu() {
    const {user, logout} = useAuth0()
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className={'flex items-center px-3 font-bold hover:text-orange-500 gap-2'}>
                <CircleUserRound className={'text-orange-500'}/>
                {user.email}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem>
                    <Link to={'/profile'}
                          className={'font-bold hover:text-orange-500'}>
                        User Profile
                    </Link>
                </DropdownMenuItem>
                <Separator/>
                <DropdownMenuItem>
                    <Button className={'flex flex-1 font-bold bg-orange-500'} onClick={logout}>
                        Log Out
                    </Button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default UserMenu;