import React, { useEffect, useState } from "react";
import useAuth from "../Hooks/useAuth.jsx";
import axios from "../api/axois.jsx";
import { useNavigate } from 'react-router-dom'
export default function Word() {
    
    const [word, setWord] = useState({});
    const [videoReceived, setVideoReceived] = useState(false);
    const [video, setVideo] = useState('');
    const { auth } = useAuth();
    
    const navigate = useNavigate();
    
    const wordId = parseInt(window.location.href.split('/').pop());
    const categoryId = window.location.href.split('/').slice(-2)[0];
    useEffect(() => {
        getWord();
    } ,[]);
    
    useEffect(() => {
        console.log('word', word);
        getVideo();
    }, [word]);

    const getWord = async () => {

        try {
            const response = await axios.get(`/v1/admin/Words/all`, {headers: {Authorization: `Bearer ${auth?.token}`}});

            if (response.status === 200) {
                // sort words for those that have the category id in their category array
                console.log('Words response', response.data.data[0].id)
                
                const wordName = response.data.data.find(thisWord => thisWord.id === wordId)
                console.log('word: ', wordName.name)
                setWord(wordName);
                return wordName;
            } else {
                console.log('Words response', response)
                return {};
            }
        } catch (error) {
            console.log('Error in getWords: ', error)
            return {};
        }
    }
    
    const getVideo = async () => {
        console.log('getVideo', word?.id)
           axios.get(`/v1/Words/${word?.id}/video`, {headers: {Authorization: `Bearer ${auth?.token}`}, responseType: 'blob'}).then(
            response => {
 
                setVideoReceived(true);
                setVideo(URL.createObjectURL(response.data));
                return response;
                
            }). catch(error => {
                console.log('Error in getVideo: ', error)
                return null;
            })
        
    }
    
        
    
    return (
        <>
            <div className="category-header" onClick={() => navigate(-1)}>
                <h1 className="category-name">Word: {word.name}</h1>
                <div className="category-back" >&lt;</div>
            </div>
            <div className="word-videobox">
                {
                    videoReceived && 
                    <div className="word-video">
                        <video controls>
                            <source src={video} type="video/mp4" />
                        </video>
                    </div>
                }
                {!videoReceived && <div className="word-video">No video available</div>}
            </div>
            
        </>
    )
    
}   