import { useNavigate } from 'react-router-dom'

export default function Header(username){

    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('token')
        navigate('/')
    }

    return(
        <>
            <div className="header home-header">
                <div className="header-welcome">Welcome, {username.username}</div>
                <button className="header-logout" onClick={logout}>Logout</button>
                <button className="header-invite" onClick={() => navigate('/invite')}>Invite</button>
            </div>
        </>
    )
}
