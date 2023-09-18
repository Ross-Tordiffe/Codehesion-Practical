import { useNavigate } from 'react-router-dom'
import { getCurrentUser } from "../services/Api.jsx";

export default function Header(username){

    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear()
        navigate('/login')
    }

    return(
        <div className="header home-header">
            <div className="header-welcome">Welcome, {username.username}</div>
            <button className="header-logout" onClick={logout}>Logout</button>
            <button className="header-invite" onClick={() => navigate('/invite')}>Invite</button>
            <div className="header-request-testing">
                <button className="get-user" onClick={getCurrentUser}>Get User</button>
            </div>
        </div>
    )
}
