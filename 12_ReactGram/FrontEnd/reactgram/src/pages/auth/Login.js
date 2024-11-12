import React from 'react'
import styles from './Login.module.css'
import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  // Criando as variáveis.
  const [email, setEmail] = useState('');  
  const [password, setPassword] = useState('');  
  const [errors, setErrors] = useState([]);
  const [msg, setMsg] = useState([]);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Resetando os erros.
    setErrors([]);
    setMsg([]);

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

    setMsg(['Segure firme, estamos autenticando seu login...']);

    console.log("tentando enviar esse body");
    console.log(newUser);

    try {
      const response = await axios.post(process.env.REACT_APP_URL_BACKEND+'/api/user/login', newUser)

      console.log(response.status);

      if(response.status !== 200) {
        setErrors(response.data.errors);
        setMsg([]);
        return
      }

      if(response.status === 200){
        try {          
          localStorage.setItem('user_id', response.data._id)
          localStorage.setItem('token', response.data.token)
          setMsg(["Autenticado, aguarde enquanto redirecionamos..."]);
          setTimeout(() => {
            navigate('/home')
          }, 3000);
        } catch (error) {
          setErrors(["Fail to register that user token in local session!"]);
          return
        }
      }

    } catch (error) {
      // handle with diferent error's.
      console.log(error.response);
      console.log(error.response.data.erros[0]);
      if(error.response && error.response.status === 400){        
        setErrors([error.response.data.erros[0]]);  
        setMsg([]);      
        return
      }
      setErrors(["Fatal error, please try again later."])
    }
  }

  return (
    <div className={styles.login}>
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