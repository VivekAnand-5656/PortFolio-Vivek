import React from 'react'
import Navbar from './Navbar' 
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

const Layout = () => {
  return (
    // <div className=' bg-linear-to-br from-[#00010A] to-[#030a44] ' >
    <div className=' bg-[#00010A] ' >
        <header><Navbar/></header>
        <main><Outlet/></main>
        <footer><Footer/></footer>
    </div>
  )
}

export default Layout