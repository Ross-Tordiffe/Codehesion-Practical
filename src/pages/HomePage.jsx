import Header from '../components/Header'
import { useState, useEffect } from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';
import useAuth from "../hooks/useAuth.jsx";
import Categories from "../components/Categories.jsx";
import Category from "../components/Category.jsx";
export default function Home({token}, {user}) {
    
    const [categories, setCategories] = useState([]);
    
    const navigate = useNavigate();
    const { auth } = useAuth();

    useEffect(() => {
        if(!auth?.token) {
            console.log('Auth token not found. Redirecting to login.')
            navigate('/login');
        }
    }, [auth, navigate]);

    return (
        <div>
            <Header username={auth?.user?.name}/>
            <Routes>
                <Route path="category/:id" element={<Category />} />
                <Route path="*" element={<Categories categories={categories} />} />
            </Routes>
        </div>
    )
}
