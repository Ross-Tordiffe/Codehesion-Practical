import axios from "../api/axois.jsx";
import React, { useRef, useState, useEffect} from 'react'
import useAuth from "../Hooks/useAuth.jsx";

export default function CreatePage() {
    
    const { auth } = useAuth();
    
    const [categories, setCategories] = useState([]);
    const [words, setWords] = useState([]);
    
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
            return [];
    
        } catch (error) {
            console.log('Error in getCategories: ', error)
            return [];
        }
    }

    const getWords = async (id) => {
        console.log('getWords id', id)
        try {
            const response = await axios.get(`/v1/admin/Words/all`, {headers: {Authorization: `Bearer ${auth?.token}`}});

            if (response.status === 200) {
                // sort words for those that have the category id in their category array
                console.log('Words response', response)
                const sortedWords = response.data.data.filter(word => word.categories.length > 0 && word.categories[0].id === parseInt(id));
                setWords(sortedWords);
                return sortedWords;
            } else {
                console.log('Words response', response)
                return [];
            }
        } catch (error) {
            console.log('Error in getWords: ', error)
            return [];
        }
    }

    useEffect(() => {
        const categories = getCategories();
    }, []);

    return (
        <div>
            <div className="category-header">
                <h1>Create</h1>
            </div>
            <div className="create-form">
                <form>
                    <select className="create-select" onChange={(e) => getWords(e.target.value)}>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>
                    <input className="create-wordbox input" type="text" placeholder="Word" />
                    <div className="create-form-buttons">
                        <button className="create-add-button form-button">Add</button>
                    </div>
                </form>
                <div className="create-words words">
                    <div className="category-words">
                    {words.length > 0 && words.map((word) => (
                        <div className="category-word word" key={word.id} id={"id" + word.id}>
                            <div className="category-word-name">{word.name}</div>
                            <div className="category-word-description">{word.description}</div>
                        </div>
                    ))}
                    </div>
                    {words.length === 0 && <div className="category-word">There are no words in this category :( Try adding some!</div>}
                </div>
            </div>
        </div>
    )
}