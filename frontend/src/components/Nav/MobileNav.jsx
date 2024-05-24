import {Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger} from "@/components/ui/sheet.jsx";
import {Button} from "@/components/ui/button.jsx";
import {CircleUserRound, Menu} from "lucide-react";
import {Separator} from "@/components/ui/separator.jsx";
import {useAuth0} from "@auth0/auth0-react";
import React from "react";
import MobileNavLinks from "@/components/Nav/MobileNavLinks.jsx";

export default function MobileNav(){
    const {loginWithRedirect, isAuthenticated, user} = useAuth0()
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Menu className={'text-orange-500'}/>
            </SheetTrigger>
            <SheetContent className={'space-y-3'}>
                <SheetTitle>
                    {isAuthenticated ?
                        (<span className={'flex items-center px-3 font-bold gap-2'}>
                             <CircleUserRound className={'text-orange-500'}/>
                            {user.email}
                        </span>)
                    :(<span> Welcome to MernEats</span>)
                    }
                </SheetTitle>
                <Separator/>
                <SheetDescription className={'flex flex-col gap-5'}>
                    {isAuthenticated ?
                        (<MobileNavLinks/>)
                        :
                        (<Button className={'flex-1 font-bold bg-orange-500'} onClick={loginWithRedirect}>Login</Button>)
                    }
                </SheetDescription>

            </SheetContent>
        </Sheet>
    )
}