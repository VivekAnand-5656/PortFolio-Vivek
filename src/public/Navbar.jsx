import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseCircle } from "react-icons/io5";

// ======== Logo =========
import logo from '../assets/mainlogo_edit.png'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  const linkClass = 'font-semibold cursor-pointer hover:text-[#dcdf08] border-b border-b-[#344C36] hover:border-b-[#dcdf08] transition-all duration-500 ease-in-out'

  return (
    <nav className='w-[94%] sm:w-[90%] lg:w-[86%] mx-auto h-[8vh] sm:h-[9vh] text-white flex justify-between items-center px-3 sm:px-5 relative z-50  rounded-full bg-[#080a12]/80 backdrop-blur-md border border-white/10 shadow-[0_5px_30px_rgba(0,0,0,0.25)]'>

    {/* ------ logo --------- */}
    <div className='flex items-center gap-2'>
        <div className='w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border border-[#c809c8]/50 shadow-[0_0_15px_#c809c8]'>
            <img src={logo} alt="Logo" className='w-full h-full object-cover' />
        </div>

        <h1 className='hidden sm:block text-lg font-bold'>
            Vivek <span className='text-[#c809c8]'>Anand</span>
        </h1>
    </div>


    {/* ---------- Links ------- */}
    <div className='hidden sm:flex items-center gap-5'> 

        <NavLink to="/" className={linkClass}>
            Home
        </NavLink>

        <HashLink smooth to="/#about" className={linkClass}>
            About
        </HashLink>

        <HashLink smooth to="/#skills" className={linkClass}>
            Skills
        </HashLink>

        <HashLink smooth to="/#services" className={linkClass}>
            Services
        </HashLink>

        <HashLink smooth to="/#projects" className={linkClass}>
            Projects
        </HashLink>

    </div>


    {/* -------- Contact Button -------- */}
    <div className='hidden sm:flex items-center gap-2'>

        <a
            href="#contact"
            className='px-4 py-2 rounded-full text-sm font-semibold border border-[#c809c8]/50 text-[#f08af0] hover:bg-[#c809c8] hover:text-white transition-all duration-300'
        >
            Let's Talk
        </a>

    </div>


    {/* --------- Hamburger ----- */}
    <div className='sm:hidden flex justify-center items-center'>

        <button
            onClick={() => setMenuOpen(!menuOpen)}
            className='w-9 h-9 flex justify-center items-center rounded-full border border-white/10 text-lg hover:text-[#c809c8] hover:border-[#c809c8] transition-all duration-300'
        >
            {menuOpen ? <IoCloseCircle /> : <GiHamburgerMenu />}
        </button>

    </div>


    {/* ---------- Mobile Menu ------- */}
    <div
        className={`sm:hidden absolute top-[calc(100%+8px)] right-0 w-52 bg-[#080a12]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-3 flex flex-col gap-1 shadow-[0_15px_40px_rgba(0,0,0,0.4)] transition-all duration-300 ${
            menuOpen
                ? 'translate-y-0 opacity-100 scale-100 pointer-events-auto'
                : '-translate-y-3 opacity-0 scale-95 pointer-events-none'
        }`}
    >

        <NavLink
            to="/"
            onClick={() => setMenuOpen(false)}
            className={linkClass}
        >
            Home
        </NavLink>

        <HashLink
            smooth
            to="/#about"
            onClick={() => setMenuOpen(false)}
            className={linkClass}
        >
            About
        </HashLink>

        <HashLink
            smooth
            to="/#skills"
            onClick={() => setMenuOpen(false)}
            className={linkClass}
        >
            Skills
        </HashLink>

        <HashLink
            smooth
            to="/#services"
            onClick={() => setMenuOpen(false)}
            className={linkClass}
        >
            Services
        </HashLink>

        <HashLink
            smooth
            to="/#projects"
            onClick={() => setMenuOpen(false)}
            className={linkClass}
        >
            Projects
        </HashLink>

        <HashLink
            smooth
            to="/#contact"
            onClick={() => setMenuOpen(false)}
            className='text-center mt-2 py-2 rounded-full bg-[#c809c8] text-sm font-semibold'
        >
            Let's Talk →
        </HashLink>

    </div>

</nav>
  )
}

export default Navbar