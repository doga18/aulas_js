import { api, requestConfig } from '../utils/config';

// Get user details
const profile = async(data, token, id) => {
  const config = requestConfig("GET", data, token, id);
  

  try {
    const res = await fetch(api + `/user/${id}`, config )
      .then((response) => response.json())
      .catch((e) => console.log(`erro: ${e}`));

      return res
  } catch (error) {
    console.log('erro na requisição');

    console.log(error);
  }
}


const userService = {
  profile
}

export default userService;