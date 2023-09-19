import { useNavigate, Link } from 'react-router-dom';
import axios from '../api/axois';
import qs from 'qs';
import React, { useRef, useState, useEffect} from 'react';
import useAuth from "../hooks/useAuth.jsx";
const InvitePage = () => {
    
    const userRef = useRef();
    const errorRef = useRef();
    const { auth } = useAuth();
    
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    // const [tempPassword, setTempPassword] = useState('Grassword') // Unsure about getting user password
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [userId, setUserId] = useState('');
    const navigate = useNavigate();
    
    useEffect(() => {
        setError('');
    }, [firstName, lastName, email])
    
    useEffect(() => {
        console.log(auth.token)
    }, [])


    // --- Unsure about getting user password ---
    // const generateTempPassword = () => {
    //     const length = 8;
    //     const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    //     let newPassword = "";
    //     for (let i = 0, n = charset.length; i < length; ++i) {
    //         newPassword += charset.charAt(Math.floor(Math.random() * n));
    //     }
    // }
    
  
    const handleSubmit = async (event) => {
        event.preventDefault()
        
        if(firstName === '' || lastName === '' || email === '') {
            setError('Please fill out all fields');
            return;
        }
        
        // const data = JSON.stringify({
        //     name: firstName,
        //     surname: lastName,
        //     email: email,
        //     role: "BackOffice",
        // });
        
        // use raw data instead of JSON.stringify
        const data = {
            name: firstName,
            surname: lastName,
            email: email,
            role: "BackOffice",
        }
        
        try {
            const response = await axios.post ('/v1/admin/Users', JSON.stringify(data), {headers: {'Content-Type': 'application/json', Authorization: `Bearer ${auth.token}` }});
            
            console.log("response: ", response);
            if (response.status === 200) {

                // --- Unsure about getting user password ---
                // Update the password of the new user with the generated password
                // setTempPassword(generateTempPassword);
                // const updateUserPasswordSuccess = await updateUserPassword();
                // if (!updateUserPasswordSuccess) {
                //     setError('Error in updating the new user');
                //     return;
                // }
                
                setSuccess(true);
                console.log("new User: ", response);
            }
        } catch (error) {
            console.log(error.message);
            if(error.message === 'timeout of 1000ms exceeded')
                setSuccess(true);
            setError(error.response.data.message);
        }
    }

    // --- Unsure about getting user password ---
    // const updateUserPassword = async () => {
    //     // event.preventDefault()
    //    
    //     console.log("updateUserPassword: ", userId);
    //    
    //     if (userId === '') {
    //         setError('Error in updating the new user');
    //         return false;
    //     }
    //    
    //     const data = {
    //         token: '',
    //         email: email,
    //         password: tempPassword,
    //         confirmPassword: tempPassword,
    //     }
    //    
    //     try {
    //         const response = await axios.get('/v1/admin/Users/resetPassword', data, {
    //             headers: {'Content-Type': 'application/x-www-form-urlencoded', Authorization: `Bearer ${auth.token}` }});
    //            
    //         if (response.status === 200) {
    //             console.log("updateUserPassword: ", response);
    //             return true;
    //         }
    //     } catch (error) {
    //         console.log(error);
    //         return false;
    //     }
    // }
    
    return (
        <>
            { success ? (
                <div className="invite-success">
                    <h1>Invite sent to {email}</h1>
                    {/*<p>*/}
                    {/* Use this password to login*/}
                    {/*</p>*/}
                    {/*<p className="invite-password">{tempPassword}</p>*/}
                    <button className="invite-continue"><Link to={'/'}>Continue</Link></button>
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
                        <button className="button form-button button-cancel" onClick={() => navigate(-1)}>Cancel</button>
                        <button className="button form-button" type="submit" onClick={handleSubmit}>Send Invite</button>
                    </div>
                </form>
            </div> )
            }
        </>
    )
}

export default InvitePage;