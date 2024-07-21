import axios from 'axios';
import React, { useState } from 'react'
import { FaCheckCircle } from 'react-icons/fa';
import { Circles } from 'react-loading-icons';
import SpinningCircles from 'react-loading-icons/dist/esm/components/spinning-circles';
import TailSpin from 'react-loading-icons/dist/esm/components/tail-spin';

export const FindBook = () => {
    const [bookToRetrieve, setBookToRetrieve] = useState({
        id:''
    });

    const [book, setBook] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [successMessage, setsuccessMessage] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const defaultValues = {
        id:''
    }

    const handleChange = (e) => {
        setBookToRetrieve((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleClick = async (e) => {
        e.preventDefault();
        try{
            setIsLoading(true);
            const res = await axios.get(`https://ah4in46bx5.execute-api.us-east-1.amazonaws.com/test/books?id=${bookToRetrieve.id}`);
            setIsLoading(false);
            setBook(res.data);
            setsuccessMessage(true);
            setShowResult(true);
            clearForm();
        }catch(err){
            console.error(err);
        }

        setTimeout(() => {
            setsuccessMessage(false)
        }, 5000);
    }

    const clearForm = () => {
        setBookToRetrieve(() => (defaultValues));
    }

  return (
    <form action="submit">
    {showResult &&
    <div className={`book-item`}>
        <div className="book-heading">
            <h2>{book[0].book_title}</h2>
            <p>#{book[0].book_id}</p>
        </div>
    <h3>{book[0].author}</h3>
    </div>
    }

    <div className="form-heading">
        <h2>Find a Book</h2>
        <p>Choose a book to retrieve by its identifier.</p>
    </div>

    <div className="input-group">
      <label htmlFor="title">Identifier</label>
      <input type="text" name='id' value={bookToRetrieve.id} onChange={handleChange} required/>
    </div>

    <button onClick={handleClick} className='add-btn loading-btn'> {!isLoading ? 'Find Book': <div className='btn-text'>Fetching... <TailSpin/></div>} </button>

    {successMessage &&
    (<div className="success-message">
      <p className='success'> Book has been retrieved. </p>
      <FaCheckCircle/>
    </div>)}
  </form>
  )
}
