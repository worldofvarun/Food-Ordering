import {Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger} from "@/components/ui/sheet.jsx";
import {Button} from "@/components/ui/button.jsx";
import {Menu} from "lucide-react";
import {Separator} from "@/components/ui/separator.jsx";

export default function MobileNav(){
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Menu className={'text-orange-500'}/>
            </SheetTrigger>
            <SheetContent className={'space-y-3'}>
                <SheetTitle>
                    <span> Welcome to MernEats</span>
                </SheetTitle>
                <Separator/>
                <SheetDescription className={'flex'}>
                    <Button className={'flex-1 font-bold bg-orange-500'}>Login</Button>
                </SheetDescription>
            </SheetContent>
        </Sheet>
    )
}