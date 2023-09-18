import axios from 'axios';
import Header from '../components/Header'
import CategoryView from '../components/CategoryView'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';

export default function Home(hosturl) {

    const url = hosturl.hosturl

    const [token, setToken] = useState(localStorage.getItem('token'));    
    const [user, setUser] = useState('');
    const [categories, setCategories] = useState([]);
    const [shownCategory, setShownCategory] = useState('');


    const navigate = useNavigate();
    const getUser = async () => {
        
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        try {
            const response = await axios.get(url + '/v1/admin/Users/current', config)

            if(response.status === 200) {
                const user = response.data.data
                setUser(user)
            }
            console.log('response', response)
        }
        catch (error) {
            console.log('error', error)
        }
    }

    const getCategories = async () => {

        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        try {
            const response = await axios.get(url + '/v1/admin/categories', config)

            if(response.status === 200) {
                const categories = response.data.data
                setCategories(categories)
                console.log('categories', categories)
            }

        } catch (error) {
            console.log('error', error)
        }
    }

    const handleCategoryClick = (category) => {
        getCategoryWords(category)
        setShownCategory(category)
    }

    const getCategoryWords = async (category) => {

        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        try {
            const response = await axios.get(url + '/v1/admin/categories/words', config)

            if(response.status === 200) {
                const words = response.data.data
                console.log('words', words)
            }
        } catch (error) {
            console.log('error', error)
        }
    }

    if(!token) {
        navigate('/');
    } else if(user === '') {
        getUser();
    } else {
        console.log('found user', user)
    }
    
    if(categories.length === 0) {
        getCategories();
    } else {
        console.log('found categories', categories)
    }

    return (
        <div>
            <Header username={user.name}/>
            <CategoryView categories={categories} shownCategory={shownCategory}/>
        </div>
    )
}
