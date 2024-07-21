import axios from 'axios';
import React, { useState } from 'react'
import { FaCheckCircle } from 'react-icons/fa';
import TailSpin from 'react-loading-icons/dist/esm/components/tail-spin';

export const UpdateBook = () => {
    const [successMessage, setSuccessMessage] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const defaultValues = {
        id:'',
        author:'',
        title:''
        }

        const [BookInfo, setBookInfo] = useState({
        id:'',
        author:'',
        title:''
        });

    const handleChange = (e) => {
        setBookInfo((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleClick = (e) => {
    e.preventDefault();
    postBook();
    clearForm();
    }

    const clearForm = () => {
        setBookInfo(() => (defaultValues));
    }

    const postBook = async () => {
        try{
            setIsLoading(true);
            const res = await axios.put(`https://ah4in46bx5.execute-api.us-east-1.amazonaws.com/test/books?id=${BookInfo.id}`, BookInfo);
            setIsLoading(false);
            setSuccessMessage(true);
            clearForm();
        }catch(err){
            console.error('Couldnt update the book, try again.', err);
        }

        setTimeout(()=>{
            setSuccessMessage(false);
        }, 3000);
    }

  return (
    <form action="submit">
    <div className="form-heading">
        <h2>Update a book</h2>
        <p>Enter the Id you wish to update and add the author and title to update to.</p>
    </div>

    <div className="input-group">
      <label htmlFor="title">Identifier</label>
      <input type="text" name='id' value={BookInfo.id} onChange={handleChange} required/>
    </div>

    <div className="input-group">
      <label htmlFor="title">Book Name</label>
      <input type="text" name='title' value={BookInfo.title} onChange={handleChange} required/>
    </div>

    <div className="input-group">
    <label htmlFor="author">Author</label>
    <input type="text" name='author' value={BookInfo.author} onChange={handleChange} required/>
    </div>

    <button onClick={handleClick} className='add-btn loading-btn'> {!isLoading ? 'Update Book': <div className='btn-text'>Updating... <TailSpin/></div>} </button>

    {successMessage &&
    (<div className="success-message">
      <p className='success'> Book has been updated.</p>
      <FaCheckCircle/>
    </div>)}
  </form>
  )
}
