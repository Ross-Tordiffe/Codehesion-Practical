import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import Layout from "./components/Layout.jsx";
import { Route, Routes } from 'react-router-dom';
import RequireAuth from "./components/RequireAuth.jsx";
import {useEffect, useState} from "react";
export default function App() {
    
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                {/* public */}
                <Route path="login" element={<LoginPage />} />
                {/*<Route path="register" element={<RegisterPage />} />*/}
                
                {/* logged in only */}
                <Route element={<RequireAuth />}>
                    <Route path="/" element={<HomePage />} />
                    {/*<Route path="profile" element={<ProfilePage />} />*/}
                    {/*<Route path="admin" element={<EditPage />} />*/}
                </Route>
                
                {/* catch all */}
                {/*<Route path="*" element={<NotFoundPage />} />*/}
                
            </Route>
        </Routes>

    );
}

// Auth token
// eyJhbGciOiJSUzI1NiIsImtpZCI6IjRDRDlGNDg5RDEwOTg4QjA5NDk3RjVBM0Y0OTc4M0Q4MUFEMkI2MDBSUzI1NiIsInR5cCI6ImF0K2p3dCIsIng1dCI6IlRObjBpZEVKaUxDVWxfV2o5SmVEMkJyU3RnQSJ9