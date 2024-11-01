import React from 'react'
import Register from './Component/Register'
import { Route,BrowserRouter as Router,Routes } from 'react-router-dom'
import Login from './Component/Login'


function App() {
  return (
    <>
      <Router>
        <Routes>
        <Route path='/' element={<Register/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        </Routes>
      </Router>
   
      
    </>
  )
}

export default App
