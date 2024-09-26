import React from 'react'

// Importando o Css
import './Navbar.css'

// Importando hooks do react-router-dom

import {Route} from 'react-router-dom';

// // Importando o Link, para ser usado nas rotas.
import {NavLink} from 'react-router-dom';


const Navbar = () => {
  return (
    <div>
        <nav>
          <NavLink to="/">Início</NavLink>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/products">Products</NavLink>
          <NavLink to="/about">Sobre</NavLink>
          
        </nav>
    </div>
  )
}

export default Navbar