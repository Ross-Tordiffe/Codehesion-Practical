import axios from 'axios';
import Header from '../components/Header'
import CategoryView from '../components/CategoryView'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
export default function Home({token}, {user}) {
    
    const [categories, setCategories] = useState([]);
    const [shownCategory, setShownCategory] = useState('');
    
    const navigate = useNavigate();

    if(!token){
        console.log('no token, redirecting to login');
        navigate('/login');
    } else {
        console.log('token found, continuing', token);
    }

    return (
        <div>
            <Header username={user?.name}/>
            <CategoryView categories={categories} shownCategory={shownCategory}/>
        </div>
    )
}
