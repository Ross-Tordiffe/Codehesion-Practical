import React, { useRef, useState, useEffect, useContext } from 'react'
import AuthContext from "../context/AuthProvider.jsx";

import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
    
    const userRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])
    
    useEffect(() => {
        setError('');
    }, [email, password])

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault()
        console.log('email', email, ' password', password);
        setEmail('');
        setPassword('');
        setSuccess(true);

        // const data = {
        //     grant_type: 'password',
        //     client_id: 'web-dashboard',
        //     client_secret: 'SuperSecretPassword',
        //     scope: 'openid profile role email offline_access adminApi mobileApi',
        //     emailAddress: emailAddress,
        //     password: password
        // }
        //
        // try {
        //    
        //     const response = await axios.post('https://edeaf-api-staging.azurewebsites.net/connect/token', qs.stringify(data), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
        //
        //     console.log('response', response)
        //     if(response.status === 200) {
        //         const token = response.data.access_token;
        //         localStorage.setItem('token', token);
        //         navigate('/home');
        //     }
        //
        // } catch (error) {
        //     setError(error.message);
        //
        //     if(error.response.status === 400) {
        //         setError('Invalid emailAddress or password')
        //     }
        // }

    }
    
    return (
        <>
            {success ? navigate('/home') : (
            <div className="form login-form">
                <h1>Login</h1>
                <p ref={errRef} className="error ? 'error' : 'hidden'">{error}</p>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">Email</label>
                    <input className="input" type="text" ref={userRef} onChange={(e) => setEmail(e.target.value)} value={email} required />
                    <label htmlFor="password">Password</label>
                    <input className="input" type="password" onChange={(e) => setPassword(e.target.value)} value={password} required />
                    <button className="button" type="submit">Login</button>
                </form>
                <div className="form-footer">
                    <p>Don't have an account? <a href="/register">Register</a></p>
                </div>
            </div>)}
        </>
    )

}

export default LoginPage