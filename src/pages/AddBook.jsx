import React from 'react'
import {FaCheckCircle} from "react-icons/fa"
import { useState } from 'react';
import axios from 'axios';
import {AiOutlineLoading3Quarters} from 'react-icons/ai'
import TailSpin from 'react-loading-icons/dist/esm/components/tail-spin';

export const AddBook = () => {
    const [successMessage, setsuccessMessage] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const defaultValues = {
        author:'',
        title:''
    }

    const [addBook, setAddBook] = useState({
    author:'',
    title:''
    });

    const handleChange = (e) => {
        setAddBook((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleClick = (e) => {
    e.preventDefault();
    postBooks();
    clearForm();
    }

    const clearForm = () => {
    setAddBook(() => (defaultValues));
    }

    const postBooks = async () => {
        try{
            setIsLoading(true);
          const res = await axios.post('https://ah4in46bx5.execute-api.us-east-1.amazonaws.com/test/books', addBook);
          setsuccessMessage(true);
          setIsLoading(false);
        }catch(err){
          console.error('Couldnt add the book, try again.', err);
        }

        setTimeout(() => {
            setsuccessMessage(false);
        },5000)
    }

  return (
    <form action="submit">

    <div className="form-heading">
        <h2>Add Book</h2>
        <p>Enter the name and author of the book you wish to add.</p>
    </div>

    <div className="input-group">
      <label htmlFor="title">Book Name</label>
      <input type="text" name='title' value={addBook.title} onChange={handleChange} required/>
    </div>

    <div className="input-group">
    <label htmlFor="author">Author</label>
    <input type="text" name='author' value={addBook.author} onChange={handleChange} required/>
    </div>

    <button onClick={handleClick} className='add-btn loading-btn'> {!isLoading ? 'Add Book': <div className='btn-text'>Adding... <TailSpin/></div>} </button>

    {successMessage &&
    (<div className="success-message">
      <p className='success'> Book added to library</p>
      <FaCheckCircle/>
    </div>)}
  </form>
  )
}
