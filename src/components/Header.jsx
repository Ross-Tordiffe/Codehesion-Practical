import { useNavigate, Link, NavLink } from 'react-router-dom'
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
            <div className="headerbox">
                <div className="header-left">
                    <NavLink className="header-button header-home" to="" activeClassName="link-active" end>Home</NavLink>
                    <h1 className="header-welcome">Welcome back, {username.username}</h1>
                </div>
                <div className="header-right">
                    <Link className="header-button header-invite" to="/invite">Invite</Link>
                    <button className="header-button header-logout" onClick={logout}>Logout</button>
                </div>
            </div>
        </div>
    )
}
