import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './layout/Layout'
import Home from './pages/Home'
import About from './pages/About';
import Dashboard from './pages/Dashboard';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout/>}>
          <Route index element={<Home/>} />
          <Route path='/about' element={<About/>} />
          <Route path='/dashboard' element={<Dashboard/>} />
          <Route path='/sign-in' element={<SignIn/>} />
          <Route path='/sign-up' element={<SignUp/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App