import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import AppLayout from "@/layouts/AppLayout.jsx";
import HomePage from "@/pages/HomePage.jsx";
import Auth0ProviderwithNavogation from "@/auth/Auth0ProviderwithNavogation.jsx";
import AuthCallback from "@/pages/AuthCallback.jsx";
import UserProfilePage from "@/pages/UserProfilePage.jsx";
import {Toaster} from "sonner";
import ProtectedRoute from "@/auth/ProtectedRoute.jsx";

export default function AppRoutes(){
    return (
        <BrowserRouter>
            <Auth0ProviderwithNavogation>
                <Toaster visibleToasts={1} position={'top-right'} richColors/>
                <Routes>
                    {/* HomePage Route */}
                    <Route path="/" element=
                        {<AppLayout hero={true}>
                            <HomePage/>
                        </AppLayout>} />

                    <Route Component={AppLayout}>
                        <Route path="/auth-callback" element={<AuthCallback/>}/>
                        <Route path="*" element={<Navigate to={'/'}/>}/>

                        {/* Protected Route */}
                        <Route Component={ProtectedRoute}>
                            <Route path="/profile" element={<UserProfilePage/>} />
                        </Route>

                    </Route>
                </Routes>
            </Auth0ProviderwithNavogation>
        </BrowserRouter>)
}