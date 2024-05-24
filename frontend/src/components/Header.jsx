import {Link} from "react-router-dom";
import MobileNav from "@/components/Nav/MobileNav.jsx";
import MainNav from "@/components/Nav/MainNav.jsx";

export default function Header(){
    return(
        <div className={'border-b-2 border-b-orange-500 py-6'}>
                <div className={'container mx-auto flex justify-between items-center'}>
                        <Link to='/' className={'text-3xl tracking-tight font-bold text-orange-500'}>
                            MernEats
                        </Link>
                        <div className={'hidden md:block'}>
                            <MainNav/>
                        </div>
                        <div className={"md:hidden"}>
                            <MobileNav/>
                        </div>
                </div>
        </div>
    )
}