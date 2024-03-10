import {Routes,Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import { useState } from 'react'
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Blogs from './pages/Blogs';
import Create from './pages/Create';

function App() {
  
  const[isLoggedIn,setIsLoggedIn] = useState(false);
  return (
   <div className='min-h-screen'>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>


      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login setIsLoggedIn={setIsLoggedIn}/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/blogs' element={<Blogs/>}/>
        <Route path='/create-blog' element={<Create/>}/>
      </Routes>
   </div>
  )
}

export default App
