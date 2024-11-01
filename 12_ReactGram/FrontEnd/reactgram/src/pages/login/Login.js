import React from 'react'
import styles from './Login.module.css'
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  // Criando as variáveis.
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const [msg, setMsg] = useState([]);

  useEffect(() => {
    console.log(`Oque você está digitando é isso ${username}`)
  }, [username])

  const handleSubmit = (e) => {
    e.preventDefault();
    // Resetando os erros.
    setErrors([]);
    setMsg([]);

    if(!username || !email  || !password || !confirmPassword) {
      setErrors(['Todos os campos devem ser preenchidos corretamente.']);
      return
    }

    if(username && username.length < 3 ) {
      console.log('user name tem menos de 5 letras ', username.length)      
      setErrors(["Seu nome precisa ter no mínimo 3 letras."])
      console.log(errors)
      return
    }

    if(email.length <= 8 ) {
      setErrors(["Seu email precisa ter no mínimo 8 letras."])
      return
    }    

    const newUser = {
      username,
      email,
      password,
      confirmPassword
    }

    setMsg(['Segure firme, estamos autenticando seu login...']);

    setTimeout(() => {
      setMsg(['Ohhh que beleza de dados, estamos validando as informações.']);
    }, (3000));

    setTimeout(() => {
      setMsg(['Não é que você é mesmo dono dessa conta?']);
    }, (7000));

    setTimeout(() => {
      setMsg(['Aguarde mais um pouco, estamos criando seu poderoso Token']);
    }, (9000));

    setTimeout(() => {
      setMsg(['Pronto, agora vamos redirecionar para o perfil.']);
    }, (12000));

    setTimeout(() => {
      setMsg(['Pronto, agora vamos redirecionar para o perfil..']);
    }, (14000));

    setTimeout(() => {
      setMsg(['Pronto, agora vamos redirecionar para o perfil...']);
    }, (16000));

    setTimeout(() => {
      setMsg(['Pronto, agora vamos redirecionar para o perfil....']);
    }, (18000));

    setTimeout(() => {
      setMsg(['Pronto, agora vamos redirecionar para o perfil.....']);
    }, (20000));

    setTimeout(() => {
      setMsg(["Let's go"]);
    }, (22000));

  }

  useEffect(() => {
    if(confirmPassword.length > 6 && (password !== confirmPassword)) {
      setErrors(['As senhas não conferem, favor corrigir antes de continuar.']);
    }
    if(password === confirmPassword) {
      setErrors([]);
    }    
  }, [confirmPassword])

  return (
    <div className={styles.login}>
      <h1>Efetue seu login</h1>
      <div className={styles.form}>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Insira seu nome de usuário</label>
          <input type="text" id="username" placeholder="Nome de usuário" onChange={(e) => setUsername(e.target.value)} value={username}/>

          <label htmlFor="email">Insira seu email</label>
          <input type="email" id="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email}/>

          <label htmlFor="password">Insira sua senha</label>
          <input type="password" id="password" placeholder="Senha" onChange={(e) => setPassword(e.target.value)} value={password}/>

          <label htmlFor="confirmPassword">Confirme sua senha</label>
          <input type="password" id="confirmPassword" placeholder="Confirme a senha" onChange={(e) => setconfirmPassword(e.target.value)} value={confirmPassword}/>

          <div className={styles.msgs}>
            {errors && errors.length > 0 && 
              <ul className={styles.errors}>
                {errors.map((error, index) => (
                  <span className={styles.errors} key={index}>{error}</span>
                ))}
              </ul>
            }
            {msg && msg.length > 0 && 
              <ul className={styles.msgs}>
                {msg.map((msg, index) => (
                  <span className={styles.msgs} key={index}>{msg}</span>
                ))}
              </ul>
            }
          </div>
          

          <div className={styles.buttons}>
            {/* <input className={isDisabled ? (styles.disabled) : styles.submit} id="submit" type="submit" value="Entrar" disabled={isDisabled} /> */}
            <input className={styles.submit} id="submit" type="submit" value="Entrar" />
            <Link to="/" className={styles.cancel}>Voltar</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login