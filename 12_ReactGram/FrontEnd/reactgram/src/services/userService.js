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

// Update user data and profile image.
const updateDataUser = async(data, token) => {
  const config = requestConfig("PUT", data, token, true);

  try {
    // try to update profile image and data.
    const res = await fetch(api + `/user/user/`, config)
      .then((response) => response.json())
      .catch((e) => console.log(`erro: ${e}`));
    return res
  } catch (error) {
    console.log(`erro: ${error}`);
  }
}

// Get user details and profile image
const getUserDetais = async(id, token) => {  
  const config = requestConfig("GET", token);

  try {
    const res = await fetch(api + `/user/${id}`, config)
      .then((res) => res.json())
      .catch((e) => console.log(`erro: ${e}}`));
    return res;
  } catch (error) {
    console.log(`erro: ${error}`);
  }
}

const userService = {
  getUserDetais,
  profile,
  updateDataUser
}

export default userService;