import { useNavigate } from 'react-router-dom'
import useAuth from "../hooks/useAuth.jsx";
import { useState, useEffect } from 'react';
export default function Header(username) {

    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const navigate = useNavigate();
    const { setAuth } = useAuth();
    
    useEffect(() => {
        if(!isLoggedIn) {
            navigate('/login');
        }
    }, [isLoggedIn, navigate]);
    const logout = () => {
        setAuth(null);
        setIsLoggedIn(false);
    }
    

    return(
        <div className="header home-header">
            <div className="header-welcome">Welcome, {username.username}</div>
            <button className="header-logout" onClick={logout}>Logout</button>
            <button className="header-invite" onClick={() => navigate('/invite')}>Invite</button>
        </div>
    )
}
