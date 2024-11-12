// Importando o css module
import style from './Navbar.module.css'
// importando o css only
import './Navbar.css'

import React from 'react'
import { NavLink, Link } from 'react-router-dom'

// Components
// Importação de ícones.
import {BsSearch, BsHouseDoorFill, BsFillPersonFill, BsFillCameraFill, BsFillBookmarkFill } from 'react-icons/bs'
import { FcAbout } from "react-icons/fc";
import { CiLogin } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";
import { RiAddCircleFill } from "react-icons/ri";

const Navbar = () => {

  // do the logout stuff
  const handlelogout = () => {    
    // Logout logic here  
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');

  };

  return (
    <nav id="nav">
      <Link to="/" className={style.title}>ReactGram</Link>
      <form>
        <BsSearch />
        <input type="text" placeholder="Pesquisar" />
      </form>
      <ul id="nav-links">
        <NavLink to="/">
          <BsHouseDoorFill />
        </NavLink>
        <NavLink to="/login">
          <CiLogin />
        </NavLink>
        <NavLink to="/register">
          <RiAddCircleFill />
        </NavLink>
        <NavLink to="/about">
          <FcAbout />
        </NavLink>
        <Link onClick={() => handlelogout()} className={style.logout}>
          <CiLogout />
        </Link>
      </ul>
    </nav>
    // <div className={style.logo}>
    //   <span className={style.title}>ReactGram, powered By dips.</span>
    //     <div className={style.links}>
    //       <NavLink to="/">Home</NavLink>
    //       <NavLink to="/login">Login</NavLink>
    //       <NavLink to="/register">Crie sua conta</NavLink>
    //       <NavLink to="/about">Sobre</NavLink>
    //     </div>
    // </div>
  )
}

export default Navbar