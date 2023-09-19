import Header from '../components/Header'
import { useEffect } from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';
import useAuth from "../hooks/useAuth.jsx";
import Categories from "../components/Categories.jsx";
import Category from "../components/Category.jsx";
import Word from "../components/Word.jsx";
export default function Home() {

    const navigate = useNavigate();
    const { auth } = useAuth();

    useEffect(() => {
        if(!auth?.token) {
            console.log('Auth token not found. Redirecting to login.')
            navigate('/login');
        }
    }, [auth, navigate]);

    return (
        <div className="homebox">
            <Header username={auth?.user?.name}/>
            <Routes>
                <Route path="category/:id/:word" element={<Word />} />
                <Route path="category/:id" element={<Category />} />
                <Route path="*" element={<Categories />} />
            </Routes>
        </div>
    )
}
