import axios from 'axios';
import Header from '../components/Header'
import CategoryView from '../components/CategoryView'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from "../hooks/useAuth.jsx";

export default function Home({token}, {user}) {
    
    const [categories, setCategories] = useState([]);
    const [shownCategory, setShownCategory] = useState('');
    
    const navigate = useNavigate();
    const { auth } = useAuth();

    useEffect(() => {
        if(!auth?.token) {
            navigate('/login');
        }
    }, [auth, navigate]);

    return (
        <div>
            <Header username={user?.name}/>
            
        </div>
    )
}
