export const api = 'http://localhost:3001/api';
export const uploads = "http://localhost:3001/uploads";
export const files = "http://localhost:3001";

export const requestConfig = (method, data, token = null, image=null) => {
  let config 

  if(image){
    console.log('dado informado contem arquivo de imagem', data, image)
    config = {
      method,
      body: data,
      headers: {}
    }
  } else if (method === "DELETE" || data === null){
    config = {
      method,
      headers: {},
    }
  } else if (method === "GET"){
    config = {
      method,
      headers: {},      
    }
  } else {
    config = {
      method,
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'        
      },      
    }
  }

  // Verify is token is informed.

  if(token){
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}


