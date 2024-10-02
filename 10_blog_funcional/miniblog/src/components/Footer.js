import React from 'react'

import styles from "./Footer.module.css";

const Footer = () => {
  return <footer className={styles.footer}>
    <div className={styles.itens}>
      <h3>
          Imagine, pense, publique, expresse-se!        
      </h3>
      <span>Ambiente Seguro para seus pensamentos.</span>
      <span>
        Desenvolvido por Douglas Pfeiffer
      </span>
    </div>
    
  </footer>
}

export default Footer