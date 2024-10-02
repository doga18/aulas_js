import React from 'react'
// Importando o CSS
import styles from './Register.module.css';

// Importando os hooks para lógica.
import { useState, useEffect} from 'react';

// Importando o Nav para dar um direcionamento no botão cancelar que na verdade é um Link

import { Link } from 'react-router-dom';

// Importando o Authenticator
import { useAuthentication } from '../../hooks/useAthentication';

const Register = () => {
  // Primeiro Passo, agora que foi importado o useState, vamos pegar os dados e exibir os dados, quando o formulário for preenchido.
  // Então criamos os states, agora vamos utilizalos.
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  // Usando uma varíavel para possiveis erros.
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(null);
  // Instanciando o hook de authentication
  // Esse passo, dá um novo apelido pra variável, ou seja o error importado transforma-se em authError para uso, dessa forma -> error: authError
  // Lembrando que se existe uma função, precisa ser colocado o () para invocar a mesma.
  const {createUser, error: authError, loading: authLoading} = useAuthentication();
  
  // Agora crio a função para impedir o envio do formulário e capturar os dados.

  const handleRegister = async (e) => {    
    // Para o envio do formulário
    e.preventDefault();    
    console.log(`Formulário submitado!`)
    console.log(`Valores enviados foram! \n Nome: ${displayName} \n Email: ${email} \n Password ${password} \n Confirmação de senha ${confirmpassword}`)

    // Resetando o error
    setError(null);
    setLoading(false);
    // Iniciando o Loading
    setLoading("Aguarde");
    // Verificando se ambas as senhas são iguais.

    if(password !== confirmpassword){
      setError('As senhas não conferem, favor corrigir antes de continuar.');
      // Return para interromper essa ação
      setLoading(null)
      return;
    }

    // if(password.length < 6){
    //   seterror("A senha precisa ter mais de 6 caracteres.")
    //   return;
    // }
    // Isso foi comentado, porque vou utilizar a reposta da API para criar o erro, lá no hook.

    // Agora com os dados alimentados, podemos montar um objeto

    const user = {
      displayName,
      email,
      password,
    }

    console.log(`Objeto, montado \n ${user}`)
    

    // Agora que foi montado o User, podemos mandar pro hook    
    try{
      const tryAuth = await createUser(user);

      console.log(`Resultado da requisição:`)
      console.log(tryAuth);

      // Aqui eu pego o Retorno da API e comparo com o nome criado no formulário.
      console.log(tryAuth.providerData[0].displayName)

      // const retorndisplaynome = tryAuth.providerData[0].displayName;

      // if(user.displayName === retorndisplaynome){
      //   console.log("Autenticou.")
      //   setLoading("Usuário Criado e autenticado!")
      //   return;
      // }

    }catch(error){
      console.log(error.message)
    }
    setLoading(null)
  }

  // O Use Effect, procura alguma modificação de variável para ser disparado, usaremos como gatilho a varíavel de erro que vem do hook, caso ela seja alimentada, ela será modificada.
  // Assim disparando o useEffet.

  useEffect(() => {
    // Aqui veriricamos se o authError, mudou para algo fora de null, porque se não existisse esse If, ele acataria até mesmo caso o erro mudasse para null ou vazio.
    if(authError){
      setError(authError);
    }
  }, [authError])

  useEffect(() => {
    if(authLoading){
      setLoading(authLoading)
    }
  }, [authLoading])
  
  return (
    <div className={styles.register}>
        <h1>
          Cadastre-se para postar
        </h1>
        <p>
          Crie seu usuário e compartilhe suas histórias.
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
        
        <form className={styles.register} onSubmit={handleRegister}>
          <label htmlFor="displayName" >
            <span>Nome: </span>
            <input 
              type="text" 
              name="displayName" 
              id="displayName"
              required
              placeholder='Nome do usuário'
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}              
            />
          </label>
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
          <label htmlFor="confirmpassword">
            <span>Confirme sua senha</span>
            <input
              type="password"
              name="confirmpassword"
              id="confirmpassword"
              required
              placeholder='Confirme sua senha'
              value={confirmpassword}
              onChange={(e) => setConfirmpassword(e.target.value)}
              autoComplete='new-password'
            />
          </label>
          {loading && 
            <button type="submit" className='btn btn-disabled btn-dark' disabled>Aguarde</button>
          }
          {!loading &&
            <button type='submit' className='btn'>Cadastrar</button>
          }          
          <Link to="/">
            <button className='btn btn-danger'>Cancelar</button>
          </Link>          
        </form>
    </div>
  )
}

export default Register