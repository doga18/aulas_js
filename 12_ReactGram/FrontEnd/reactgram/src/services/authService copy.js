import { api, requestConfig } from '../utils/config';

// Register user.

const register = async (data) => {
  const config = requestConfig("POST", data);
  console.log(`Dados recebidos: ${config.body}`);

  try {
    const res = await fetch(`${api}/user/register`, config);

    // Verify is that response have a status of error
    if(!res.ok){
      const contentType = res.headers.get('content-type');

      // if response if a json response
      if(contentType && contentType.includes("application/json")){
        const errorData = await res.json();
        console.log("Então caiu no erro! de verifiação !res.ok");
        console.log(errorData);
        throw new Error(errorData.errors ? errorData.errors[0] : "Erro no registro!");
      }
    }
    
    // if response is succceded.
    const dataJson = await res.json();
    console.log(`Resposta do registro: ${JSON.stringify(dataJson)}`);

    // save the data with local storage

    if(dataJson.includes('_id')){
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

const authService = {
  register,
};

export default authService;