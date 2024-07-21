import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Lottie from "lottie-react"
import animationData from '../assets/loading-anim.json'

export const AllBooks = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [books, setBooks] = useState([]);

    useEffect(()=>{
        const fetchBook = async () => {
            try{
            setIsLoading(true);
            const response = await axios.get('https://ah4in46bx5.execute-api.us-east-1.amazonaws.com/test/books');
            setIsLoading(false);
            setBooks(response.data);
            }catch(err){
            console.error('Could not fetch books data', err);
            }
        }
        fetchBook();
    },[]);

  return (
    <div className="book-container">
        {isLoading && <Lottie animationData={animationData} className='lottie-anim'></Lottie>}
        {books.map((item, id) => {
        return(
            <div className={`book-item book-${id + 1}`}>
                <div className="book-heading">
                    <h2>{item.book_title}</h2>
                    <p>#{item.book_id}</p>
                </div>
            <h3>{item.author}</h3>
            </div>
        )
        })}
    </div>
  )
}

