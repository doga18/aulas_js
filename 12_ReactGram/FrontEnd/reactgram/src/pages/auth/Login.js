import React from 'react'
import './Login.css'
import styles from './Login.module.css'
import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

// Icons for loading
import { VscIssueReopened } from "react-icons/vsc";

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { login, reset } from '../../slices/authSlice';

import Message from '../../components/Message';

const Login = () => {
  
  // Criando as variáveis.
  const [email, setEmail] = useState('');  
  const [password, setPassword] = useState('');  
  const [errors, setErrors] = useState([]);

  // const navigate = useNavigate();

  const dispatch = useDispatch();

  const { loading, error} = useSelector((state) => state.auth);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Resetando os erros.
    setErrors([]);    

    if(!email || !password ) {
      setErrors(['Todos os campos devem ser preenchidos corretamente.']);
      return
    }

    if(email && email.length < 3 ) {
      console.log('user name tem menos de 5 letras ', email.length)      
      setErrors(["Seu nome precisa ter no mínimo 3 letras."])
      console.log(errors)
      return
    }

    if(email.length <= 3 ) {
      setErrors(["Seu usuário ou email precisa ter no mínimo 3 caracteres."])
      return
    }    

    const newUser = {
      email,
      password
    }

    try {
      dispatch(login(newUser));
    } catch (error) {
      console.log(error);
    }
  }

  // clean all auth states, limpando todos os status de autenticação.
  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  return (
    <div className={styles.login}>
      {loading && <>
        <h1>Aguarde Carregando!</h1>
      </>}
      <h1>Efetue seu login</h1>
      <div className={styles.form}>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Entre com seu usuário/email</label>
          <input type="text" id="email" placeholder="usuário ou email" onChange={(e) => setEmail(e.target.value)} value={email}/>

          <label htmlFor="password">Insira sua senha</label>
          <input type="password" id="password" placeholder="Senha" onChange={(e) => setPassword(e.target.value)} value={password}/>

          <div className={styles.msgs}>
            {errors && errors.length > 0 && 
              <ul className={styles.errors}>
                {errors.map((error, index) => (
                  <span className={styles.errors} key={index}>{error}</span>
                ))}
              </ul>
            }            
          </div>

          {loading && 
            <div className="loading_icon">
              <VscIssueReopened size="25" />
            </div>
          }

          {error && <Message msg={error} type="error" />}

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