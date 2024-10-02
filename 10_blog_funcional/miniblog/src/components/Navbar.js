import React from 'react'

import styles from "./Navbar.module.css";

import { NavLink } from 'react-router-dom';

// Aqui importamos os hooks para pegar a autenticação e os dados do usuário se existir.
// hooks do auth
import { useAuthentication } from '../hooks/useAthentication';

// hooks dos dados do usuários
import { useAuthValue } from '../context/AuthContext';

const Navbar = () => {

    const { user } = useAuthValue();
    const { logout } = useAuthentication();

  return (
    <div>
        <nav className={styles.navbar}>
            {/* <Link to="/" className={styles.brand}>
                Mini <span>Blog</span>
            </Link> */}
            <NavLink to="/" className={styles.brand}>
                Mini <span>Blog</span>
            </NavLink>
            <ul className={styles.links_list}>
                <li>
                    {/* Podemos verificar o isActive para determinar através de arrow function se setamos uma classe do css ou outra */}
                    <NavLink to="/" className={({isActive}) => (isActive ? styles.active : '')}>Home</NavLink>
                </li>
                <li>
                    <NavLink to="/about" className={({isActive}) => (isActive ? styles.active : '')}>Sobre</NavLink>
                </li>
                {/* Se não logado */}
                {!user &&
                <>
                    <li>
                        <NavLink to="/register" className={({isActive}) => (isActive ? styles.active : '')}>Cadastrar</NavLink>
                    </li>
                    <li>
                        <NavLink to="/login" className={({isActive}) => (isActive ? styles.active : '')}>Logar</NavLink>
                    </li>
                </>
                }
                {/* Se logado */}
                {user &&
                    <>
                        <li>
                            <NavLink to="/posts/create" className={({isActive}) => (isActive ? styles.active : '')}>Criar Novo Post</NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard" className={({isActive}) => (isActive ? styles.active : '')}>Dasboard</NavLink>
                        </li>
                    </>
                }
                {user && 
                    <>
                        <li>
                            <button className={styles.logout} onClick={logout} >Deslogar</button>
                        </li>
                    </>
                }
            </ul>            
        </nav>
    </div>
  )
}

export default Navbar