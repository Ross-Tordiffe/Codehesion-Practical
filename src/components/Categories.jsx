import CategoryCard from "./CategoryCard";
import React, { useRef, useState, useEffect} from 'react'
import axios from '../api/axois'
import useAuth from "../Hooks/useAuth.jsx";
export default function Categories() {

    const errorRef = useRef();
    const [error, setError] = useState('');
    const [categories, setCategories] = useState([]);
    const { auth } = useAuth();
    
    useEffect(() => {
        setError('');
    }, [categories]);
   
    const getCategories = async () => {
        
        try {
            const response = await axios.get('/v1/admin/categories', {headers: {Authorization: `Bearer ${auth?.token}`}});
            console.log('response', response);
            
            if (response.status === 200) {
                const categories = response.data.data;
                setCategories(categories);
                return categories;
            }
            
            // fetch failed
            console.log('response', response, auth?.token)
            setError("Error in getCategories: fetch failed");
            return [];
            
        } catch (error) {
            console.log('Error in getCategories: ', error)
            return [];
        }
    }

    useEffect(() => {
        const categories = getCategories();
        
    }, []);
    
    return (
        <div className="categories">
            <p ref={errorRef} className={error ? 'categories-error' : 'hidden'}>{error}</p>
            {categories.map((category) => (
                <CategoryCard key={category.id} category={category} />
            ))}
        </div>
    )
}