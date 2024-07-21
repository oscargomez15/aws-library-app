import React from 'react'
import { FaBook, FaSearch } from 'react-icons/fa'
import {Link } from 'react-router-dom'
import {IoIosAddCircle, IoIosRefreshCircle} from 'react-icons/io'
import {MdDelete} from 'react-icons/md'

export const Navigation = () => {
  return (
    <nav>
        <ul className='nav-list'>
        <Link to=''><li><FaBook/> All Books</li></Link>
        <Link to='find-book'><li><FaSearch/> Find Book</li></Link>
        <Link to='add-book'><li><IoIosAddCircle/> Add Book</li></Link>
        <Link to='delete-book'><li> <MdDelete/> Delete Book </li> </Link>
        <Link to='update-book'><li> <IoIosRefreshCircle/> Update Book</li></Link>
        </ul>
    </nav>
  )
}
