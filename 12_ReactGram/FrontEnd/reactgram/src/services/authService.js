import { api, requestConfig } from '../utils/config';

// Register user.

const register = async (data) => {
  const config = requestConfig("POST", data);
  console.log(`Dados recebidos: ${config.body}`);

  try {
    const res = await fetch(`${api}/user/register`, config)
      .then((res) => res.json())
      .catch((err) => err)
    
    if(res){
      // if item user exists already, that is be deleted before save the new one.

      if(localStorage.getItem('user')){
        // if user already exists, that is be deleted.
        localStorage.removeItem('user');
      }
      // otherwise save the new user!
      localStorage.setItem('user', JSON.stringify(res));
    }

    return res;

  } catch (error) {
    // if requisition return a error.
    console.error('Erro na requisição!:', error);
    throw error;
  }
}

const login = async (data) => {
  const config = requestConfig("POST", data);
  try {
    const res = await fetch(`${api}/user/login`, config)
    .then((res) => res.json())
    .catch((err) => err)

    if(res){
      console.log(`resposta do fetch ${res}`) 
      console.log(res)     ;
      // verify if local item exists
      if(localStorage.getItem('user')){
        localStorage.removeItem('user');
      }
      if(res.errors && res.errors.length > 0){
        localStorage.setItem('error', JSON.stringify(res.errors));
      }
      if(res.ok){
        localStorage.setItem('user', JSON.stringify(res));        
      }
    }
    return res;
  } catch (error) {
    console.error('Erro na requisiçao de login: ' + error);
    throw error;
  }
}

// logout 

const logout = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('error');
}

const authService = {
  register,
  login,
  logout,
};

export default authService;