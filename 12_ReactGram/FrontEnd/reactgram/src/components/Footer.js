import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.links}>
        <h5>Conheça mais meu trabalho</h5>
        <ul className={styles.links_ul}>
          <li className="item">
            <Link to="https://github.com/doga18">GitHub</Link>
          </li>          
          <li className="item">
            <Link to="https://www.linkedin.com/in/doga-silva-9b147b176/">LinkedIn</Link>
          </li>
          <li className="item">
            <Link to="https://www.instagram.com/doga18/">Instagram</Link>
          </li>
        </ul>
      </div>
      <div className={styles.contats}>
        <h4>Contato</h4>
        <p>Email: doga18@gmail.com</p>
        <p>Telefone: (11) 99999-9999</p>
      </div>
    </div>
  )
}

export default Footer