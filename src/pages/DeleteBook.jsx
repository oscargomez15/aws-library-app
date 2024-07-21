import axios from 'axios';
import React, { useState } from 'react'
import { FaCheckCircle } from 'react-icons/fa';
import TailSpin from 'react-loading-icons/dist/esm/components/tail-spin';

export const DeleteBook = () => {
    const [bookToDelete, setBookToDelete] = useState({
        id:''
    });
    const defaultValues = {
      id:''
    }
    const [successMessage, setSuccessMessage] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setBookToDelete((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleClick = async (e) => {
        e.preventDefault();
        try{
          setIsLoading(true);
            const res = await axios.delete(`https://ah4in46bx5.execute-api.us-east-1.amazonaws.com/test/books?id=${bookToDelete.id}`);
            setIsLoading(false);
            setSuccessMessage(true);
            clearForm();
        }catch(err){
            console.error(err);
        }

        setTimeout(() => {
          setSuccessMessage(false);
        }, 3000)
    }

    const clearForm = () => {
      setBookToDelete(()=>(defaultValues));
    }

  return (
    <form action="submit">
      <div className="form-heading">
        <h2>Delete a Book</h2>
        <p>Choose a book to delete by its identifier.</p>
      </div>

    <div className="input-group">
      <label htmlFor="title">Identifier</label>
      <input type="text" name='id' value={bookToDelete.id} onChange={handleChange} required/>
    </div>

    <button onClick={handleClick} className='add-btn loading-btn'> {!isLoading ? 'Delete Book': <div className='btn-text'>Deleting... <TailSpin/></div>} </button>

    {successMessage &&
    (<div className="success-message">
      <p className='success'> Book deleted. </p>
      <FaCheckCircle/>
    </div>)}
  </form>
  )
}
