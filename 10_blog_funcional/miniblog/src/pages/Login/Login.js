import React from 'react'

import { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import styles from './Login.module.css'

import { useAuthentication } from '../../hooks/useAthentication';

const Login = () => {
  // Varíavies dos hooks

  const {LoginUser, error: authError, loading: authLoading} = useAuthentication();

  // Variáveis Gerais
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [loading, setLoading] = useState();
  const [error, setError] = useState(); 
  

  const handleLogin = async (e) => {    
    e.preventDefault();

    console.log('like a jesus');

    const user = {
      email,
      password
    }
    // Tentando realizar o login
    await LoginUser(user);    

    setLoading(null);
  }

  useEffect(() => {
    if(authLoading){
      setLoading(authLoading)
    }
  }, [authLoading])

  useEffect(() => {
    if(authError){
      setError(authError)
    }
  }, [authError])

  return (
    <div className={styles.login}>
        <form className={styles.register} onSubmit={handleLogin}>          
          <h1>
            Entre para postar
          </h1>
          <p>
            Entre com seu usuário e compartilhe suas histórias.
          </p>        
          {error && 
            <div className="error">
              {error}
            </div>
          }
          {loading &&
            <div className="messages">              
              {loading}
            </div>
          }
          <label htmlFor="email">
            <span>Email</span>
            <input 
              type="text" 
              name="email" 
              id="email" 
              required
              placeholder='example@gmail.com'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete='username'
            />
          </label>
          <label htmlFor="password">
            <span>Senha</span>
            <input
              type="password"
              name="password"
              id="password"
              required
              placeholder='Crie sua senha'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete='new-password'
            />
          </label>
          
          {loading && 
            <button type="submit" className='btn btn-disabled btn-dark' disabled>Aguarde</button>
          }
          {!loading &&
            <button type='submit' className='btn'>Logar</button>
          }          
          <Link to="/">
            <button className='btn btn-danger'>Cancelar</button>
          </Link>          
        </form>
    </div>
  )
}

export default Login