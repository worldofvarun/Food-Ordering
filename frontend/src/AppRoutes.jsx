import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import AppLayout from "@/layouts/AppLayout.jsx";
import HomePage from "@/pages/HomePage.jsx";
import Auth0ProviderwithNavogation from "@/auth/Auth0ProviderwithNavogation.jsx";

export default function AppRoutes(){
    return (
        <BrowserRouter>
            <Auth0ProviderwithNavogation>
                <Routes>
                    <Route Component={AppLayout}>
                        <Route path="/" element={<HomePage/>} />
                        <Route path="/profile" element={<span>user profile</span>} />
                        <Route path="*" element={<Navigate to={'/'}/>}/>
                    </Route>
                </Routes>
            </Auth0ProviderwithNavogation>
        </BrowserRouter>)
}