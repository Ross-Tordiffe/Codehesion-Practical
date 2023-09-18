import React, { useState, useEffect } from 'react'
import axios from 'axios'
import qs from 'qs'

export default function LoginPage() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')


    

    const handleEmailChange = (e) => {
        if (e.target.value !== '') {
            setUsername(e.target.value)
        }
    }

    const handlePasswordChange = (e) => {
        if (e.target.value !== '') {
            setPassword(e.target.value)
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        console.log('username', username)
        console.log('password', password)

        const data = {
            grant_type: 'password',
            client_id: 'web-dashboard',
            client_secret: 'SuperSecretPassword',
            scope: 'openid profile role email offline_access adminApi mobileApi',
            username: username,
            password: password
        }

        try {
            
            const response = await axios.post('https://edeaf-api-staging.azurewebsites.net/connect/token', qs.stringify(data), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })

            if(response === 200) {
                const data = await response.json();
                localStorage.setItem('token', data.access_token)
            }

        } catch (error) {
            setError(error.message)
    
            if(error.response.status === 400) {
                setError('Invalid username or password')
            }
        }
    }
    
    return (
        <div>
            <h1>Login</h1>
            <form>
                <input className="input" type="text" onChange={handleEmailChange} placeholder="Email" />
                <input className="input" type="password" onChange={handlePasswordChange} placeholder="Password" />
                <button className="button" type="submit" onClick={handleSubmit}>Login</button>
            </form>
        </div>
    )

}