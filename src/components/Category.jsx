﻿import React, { useEffect, useState, useRef } from "react";
import axios from '../api/axois'
import useAuth from "../Hooks/useAuth.jsx";
import { useNavigate } from 'react-router-dom'

export default function Category() {

    const errorRef = useRef();
    
    const [category, setCategory] = useState({});
    const [words, setWords] = useState([]);
    const [error, setError] = useState('');
    const { auth } = useAuth();
    const navigate = useNavigate();
    
    const id = window.location.href.split('/').pop();
    
    useEffect(() => {
        setError('');
    }, [category]);
    
    useEffect(() => {
        getCategory();
        getWords();
    }, []);
    
    const getCategory = async () => {
        try {
            const response = await axios.get(`/v1/admin/categories/${id}`, {headers: {Authorization: `Bearer ${auth?.token}`}});
            if (response.status === 200) {
                const words = getWords();
                if(!words) {
                    setError('There are no words in this category');
                }
                const category = response.data.data;
                setCategory(category);
            } else {
                setError("Error in getCategory: fetch failed");
            }
        } catch (error) {
            console.log('Error in getCategory: ', error)
        }
    }
    
    const getWords = async () => {
        try {
            const response = await axios.get(`/v1/admin/Words/all`, {headers: {Authorization: `Bearer ${auth?.token}`}});
            if (response.status === 200) {
                // sort words for those that have the category id in their category array
                const sortedWords = response.data.data.filter(word => word.categories.length > 0 && word.categories[0].id === parseInt(id));
                setWords(sortedWords);
                return sortedWords;
            } else {
                setError("Error in getWords: fetch failed");
                return [];
            }
        } catch (error) {
            console.log('Error in getWords: ', error)
            return [];
        }
    }
    
    return (
        <>
            <div className="category-header" onClick={() => navigate(-1)}>
                <h1 className="category-name">{category.name}</h1>
                <div className="category-back" >&lt;</div>
            </div>
            <div className="category" id={id}>
                <p ref={errorRef} className={error ? 'category-error' : 'hidden'}>{error}</p>
                <div className="category-words words">
                    {words.length > 0 && words.map((word) => (
                        <div className="category-word word" key={word.id} id={"id" + word.id} onClick={() => navigate(`/category/${category.id}/${word.id}`)}>
                            <div className="category-word-name">{word.name}</div>
                            <div className="category-word-description">{word.description}</div>
                        </div>
                    ))}
                    {words.length === 0 && <div className="category-word">There are no words in this category :(</div>}
                </div>
            </div>
        </>
    )
}