import React from 'react'
// 2 - Links com react router
import './Navbar.css'
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
        <nav>
            {/* <Link to="/">Home</Link>
            <Link to="/about">Sobre</Link> */}
            <NavLink to="/">Início</NavLink>
            {/* Esse é outro jeito para deixar o link ativo com classe do css personalizada. */}
            <NavLink to="/about" className={({isActive}) => (isActive ? "esta-ativo" : "nao-ativo")}>Sobre</NavLink>
            <NavLink to="/about">Sobre</NavLink>

        </nav>
    </div>
  )
}

export default Navbar