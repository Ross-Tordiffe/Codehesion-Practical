import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import { useRoutes } from 'react-router-dom';
import {useEffect, useState} from "react";
export default function Root() {

    const [token, setToken] = useState(null);
    
    useEffect(() => {
        localStorage.setItem('token', JSON.stringify(token));
    }, [token]);

    const [user, setUser] = useState(null);

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(user));
    }, [user]);

    const routes = useRoutes([
        {
            path: '/',
            element: <HomePage token={token} user={user} />
        },
        {
            path: '/login',
            element: <LoginPage token={token} setToken={setToken} setUser={setUser} />
        }
    ]);

    return routes;
}