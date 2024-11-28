// Importando o css module
import style from './Navbar.module.css'
// importando o css only
import './Navbar.css'

import { useAuth } from '../hooks/useAuth';

import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../slices/authSlice';

import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';

// Components
// Importação de ícones.
import {BsSearch, BsHouseDoorFill, BsFillPersonFill, BsFillCameraFill, BsFillBookmarkFill } from 'react-icons/bs'
import { FcAbout } from "react-icons/fc";
import { CiLogin } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";
import { RiAddCircleFill } from "react-icons/ri";

const Navbar = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { auth, loading} = useAuth();
  const { user } = useSelector((state) => state.auth);
  if(loading){
    return <div>Carregando...</div>
  }

  // do the logout stuff
  const handlelogout = () => {    
    dispatch(logout());
    dispatch(reset());

    navigate("/login");
  };

  return (
    <nav id="nav">
      <Link to="/" className={style.title}>ReactGram</Link>
      <form>
        <BsSearch />
        <input type="text" placeholder="Pesquisar" />
      </form>
      <ul id="nav-links">
        {auth ? (
          <>
            <li>
              <NavLink to="/" title="Página Inicial">
                <BsHouseDoorFill />
              </NavLink>
            </li>
            {auth && user && (
              <>
                <li>
                  <NavLink to={`/profile/`} title="Editar Perfil">
                    <BsFillPersonFill />
                  </NavLink>
                </li>
                <li>
                  <NavLink to={`/profile/${user._id}`} title="Ver Perfil">
                    <BsFillCameraFill />
                  </NavLink>
                </li>
              </>              
            )}
            <li>
              <Link onClick={() => handlelogout()} className={style.logout} title="Sair">
                <CiLogout />
              </Link>
            </li>            
          </>
        ) : (
          <>
            <li>
              <NavLink to="/login">
                <CiLogin />
              </NavLink>
            </li>
            <li>
              <NavLink to="/register">
                <RiAddCircleFill />
              </NavLink>
            </li>
          </>
        )}
        <NavLink to="/about">
          <FcAbout />
        </NavLink>
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