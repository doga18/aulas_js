import React from 'react'
import { Link } from 'react-router-dom'
// Imports of Styles of Home
import styles from './Home.module.css'


const Home = () => {
  return (
    <div className="home">
      <h1 className={styles.title}>
        Bem vindo ao ReactGram, Inspirado no Instagram.
        <p>Api Key: <Link to={process.env.REACT_APP_URL_BACKEND} target="_blank">{process.env.REACT_APP_URL_BACKEND}</Link></p>
      </h1>
      <span className={styles.subtitle}>Para Acessar, Faça seu <Link to="/login">Login</Link> ou <Link to="/register">Crie sua conta.</Link></span>
    </div>
  )
}

export default Home