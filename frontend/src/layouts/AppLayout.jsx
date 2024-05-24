import {Outlet} from "react-router-dom";
import Header from "@/components/Header.jsx";
import Footer from "@/components/Footer.jsx";
import Hero from "@/components/Hero.jsx";

export default function AppLayout({children, hero= false}){
    return(
        <div className={'flex flex-col min-h-screen'}>
            <Header/>
            {/* conditional rendering */}
            {hero && <Hero/>}
            <div className={'container w-full flex-1 mx-auto py-10'}>
                <Outlet/>
                {children}
            </div>
            <Footer/>
        </div>
    )
}