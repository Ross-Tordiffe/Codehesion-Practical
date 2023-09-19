import React, { useRef, useState, useEffect} from 'react';
import useAuth from "../Hooks/useAuth.jsx";
import axios from '../api/axois';
import qs from 'qs';
import { useNavigate, Link } from 'react-router-dom';

const LoginPage = () => {
    
    const { setAuth } = useAuth();
    const userRef = useRef();
    const errorRef = useRef();
    
    const { auth } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if(auth?.token) {
            console.log('Auth token found. Redirecting to home.')
            // navigate('/login');
        }
    }, [auth, navigate]);

    useEffect(() => {
        userRef.current.focus();
    }, [])
    
    useEffect(() => {
        setError('');
    }, [email, password])
    
    useEffect(() => {
        if (success) {
            navigate('/');
        }
    }, [success, navigate])
        
    


    const handleSubmit = async (event) => {
        event.preventDefault()

        const data = {
            grant_type: 'password',
            client_id: 'web-dashboard',
            client_secret: 'SuperSecretPassword',
            scope: 'openid profile role email offline_access adminApi mobileApi',
            username: email,
            password: password
        }

        try {
            const response = await axios.post('/connect/token', qs.stringify(data), {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
            
            const token = response?.data?.access_token;
            
            const user = await getCurrentUser(token);
            
            if (user) {
                setAuth({token, user});
                setSuccess(true);
                setEmail('');
                setPassword('');
            } else {
                setError('Failed to get current user');
                errorRef.current.focus();
            }
        } catch (error) {
            if (!error.response) {
                setError('No response from server');
            } else if (error.response.status === 400) {
                setError('Invalid emailAddress or password');
            } else if (error.response.status === 401) {
                setError('Unauthorized');
            } else {
                setError(error.message);
            }
            errorRef.current.focus();
        }
    }
    
    const getCurrentUser = async (token) => {
        
        try {
            const response = await axios.get('/v1/admin/Users/current', {headers: {Authorization: `Bearer ${token}`}})
            if (response.status === 200) {
                return response.data.data;
            }
        } catch (error) {
            return null;
        }
    }
            
    
    
    return (
            <div className="form login-form">
                <h1>Login</h1>
                <p ref={errorRef} className={error ? 'error' : 'hidden'}>{error}</p>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input className="input" type="text" ref={userRef} onChange={(e) => setEmail(e.target.value)} value={email} required />
                    </div>    
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input className="input" type="password" onChange={(e) => setPassword(e.target.value)} value={password} required />
                    </div>
                        <button className="button form-button" type="submit">Login</button>
                </form>
            </div>
    )
}

export default LoginPage