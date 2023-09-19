import { createContext, useState, useEffect } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    
 
    const [auth, setAuth] = useState({});

    // if there is a user token in local storage, add it to use state
    if(localStorage.getItem('auth-timeout') < Date.now()) {
        localStorage.removeItem('auth');
        localStorage.removeItem('auth-timeout');
    } else if(localStorage.getItem('auth') && !auth?.token) {
        const auth = JSON.parse(localStorage.getItem('auth'));
        setAuth({ ...auth});
    }
    
    
    useEffect(() => {
        if(auth?.token) {
            console.log('setting auth timeout')
            localStorage.setItem('auth', JSON.stringify(auth))
            localStorage.setItem('auth-timeout', JSON.stringify(Date.now() + 600000));
        } else {
            localStorage.removeItem('auth');
        }
    }, [auth]);
    
    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;