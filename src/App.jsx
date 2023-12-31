import HomePage from './components/HomePage.jsx';
import LoginPage from './components/LoginPage.jsx';
import InvitePage from './components/InvitePage.jsx';
import Layout from "./components/Layout.jsx";
import { Route, Routes } from 'react-router-dom';
import RequireAuth from "./components/RequireAuth.jsx";
export default function App() {
    
    return (
        <Routes>
            <Route path="*" element={<Layout />}>
                
                {/* public */}
                <Route path="login" element={<LoginPage />} />
                
                {/* logged in only */}
                <Route element={<RequireAuth />}>
                    <Route path="*" element={<HomePage />} />
                    <Route path="invite" element={<InvitePage />} />
                </Route>
                
            </Route>
        </Routes>
    );
}