import style from './Navbar.module.css'
import React from 'react'
import { NavLink } from 'react-router-dom'


const Navbar = () => {
  return (
    <div className={style.logo}>
      <span className={style.title}>ReactGram, powered By dips.</span>
        <div className={style.links}>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/register">Crie sua conta</NavLink>
          <NavLink to="/about">Sobre</NavLink>
        </div>
    </div>
  )
}

export default Navbar