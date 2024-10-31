import React from 'react'
import styles from './Login.module.css'
import { useState } from 'react';


const Login = () => {
  // Criando as variáveis.
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');

  return (
    <div className={styles.login}>
      <h1>
        Efetue seu login
      </h1>
      <form>
        <div className={styles.input_itens}>
          <label htmlFor="username">Insira seu nome de usuário</label>
          <input type="text" id="username" placeholder="Nome de usuário" onChange={(e) => setUsername(e.target.value)} value={username}/>

          <label htmlFor="email">Insira seu email</label>
          <input type="email" id="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email}/>

          <label htmlFor="password">Insira sua senha</label>
          <input type="password" id="password" placeholder="Senha" onChange={(e) => setPassword(e.target.value)} value={password}/>
          
          <label htmlFor="confirmPassword">Confirme sua senha</label>
          <input type="password" id="confirmPassword" placeholder="Confirme a senha" onChange={(e) => setconfirmPassword(e.target.value)} value={confirmPassword}/>
        </div>
      </form>
    </div>
  )
}

export default Login