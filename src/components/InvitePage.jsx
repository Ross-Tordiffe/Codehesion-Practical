import { useNavigate, Link } from 'react-router-dom';
import axios from '../api/axois';
import React, { useRef, useState, useEffect} from 'react';
import useAuth from "../hooks/useAuth.jsx";
const InvitePage = () => {
    
    const userRef = useRef();
    const errorRef = useRef();
    const { auth } = useAuth();
    
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();
    
    useEffect(() => {
        setError('');
    }, [firstName, lastName, email])
    
    useEffect(() => {
        console.log(auth.token)
    }, [])
  
    const handleSubmit = async (event) => {
        event.preventDefault()
        
        if(firstName === '' || lastName === '' || email === '') {
            setError('Please fill out all fields');
            return;
        }
        
        const data = {
            name: firstName,
            surname: lastName,
            email: email,
            role: "BackOffice",
        }
        
        try {
            const response = await axios.post ('/v1/admin/Users', JSON.stringify(data), {headers: {'Content-Type': 'application/json', Authorization: `Bearer ${auth.token}` }});
            if (response.status === 200) {
                setSuccess(true);
            }
        } catch (error) {
            console.log(error.message);
            if(error.message === 'timeout of 1000ms exceeded')
                setSuccess(true);
            setError(error.response.data.message);
        }
    }
    
    return (
        <>
            { success ? (
                <div className="invite-success form">
                    <form>
                        <h1>Invite sent to {email}</h1>
                        <Link className="invite-continue form-button" to={'/'}>Continue</Link>
                    </form>
                </div>
            ) : (
            <div className="form invite-form">
                <h1>Invite a friend</h1>
                <p ref={errorRef} className={error ? 'invite-error' : 'hidden'}>{error}</p>
                <form>
                    <div className="input-group">
                        <label htmlFor="firstName">First Name</label>
                        <input className="input" type="text" ref={userRef} onChange={(e) => setFirstName(e.target.value)} value={firstName} />
                    </div>  
                    <div className="input-group">
                        <label htmlFor="lastName">Last Name</label>
                        <input className="input" type="text" onChange={(e) => setLastName(e.target.value)} value={lastName} />
                    </div>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input className="input" type="text" onChange={(e) => setEmail(e.target.value)} value={email} />
                    </div>
                    <div className="button-group">
                        <button className="button form-button button-cancel" onClick={() => navigate('/')}>Cancel</button>
                        <button className="button form-button" type="submit" onClick={handleSubmit}>Send Invite</button>
                    </div>
                </form>
            </div> )
            }
        </>
    )
}

export default InvitePage;