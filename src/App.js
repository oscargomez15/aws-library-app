import './App.css';
import { Navigation } from './components/Navigation';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { AllBooks } from './pages/AllBooks';
import { AddBook } from './pages/AddBook';
import { DeleteBook } from './pages/DeleteBook';
import { FindBook } from './pages/FindBook';
import { UpdateBook } from './pages/UpdateBook';

function App() {
  return (
    <div className="App">
      <div className="page-heading">
        <h1 className='heading'>Welcome to the Library</h1>
        <h3>This libray was made using API Gateway, Lambda Functions, RDS and SNS. </h3>
      </div>
      <Navigation/>
      <Routes>
        <Route path="/" element={<AllBooks/>}/>
        <Route path='/add-book' element={<AddBook/>}/>
        <Route path='/delete-book' element={<DeleteBook/>}></Route>
        <Route path='/find-book' element={<FindBook/>}></Route>
        <Route path='/update-book' element={<UpdateBook/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
