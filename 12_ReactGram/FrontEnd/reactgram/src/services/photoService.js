import { api, requestConfig } from '../utils/config';

// Insert new Post about Photo.
const createPost = async(data, token) => {
  console.log('token sendo informado!', token);
  const config = requestConfig("POST", data, token, true);

  try {
    const res = await fetch(api + "/photos/", config)
      .then((res) => res.json())
      .catch((err) => err);
    return res;
  } catch (error) {
    console.log(error);
  }
}
// Get all posts for the home page.
const getPosts = async(data, token) => {  
  const config = requestConfig("GET", data, token);

  try {
    const res = await fetch(api + "/photos/getallphotos/", config)
      .then((res) => res.json())
      .catch((err) => err)

    return res
  } catch (error) {
    console.log(error);
  }
}
// Get all photos of posts, if the owner is who ask for them.
const getUserPhotos = async(data, id, token) => {
  const config = requestConfig("GET", data, token);

  try {
    const res = await fetch(api + "/photos/getallphotos/" + id, config)
      .then((res) => res.json())
      .catch((err) => err)
    return res;
  } catch (error) {
    console.log(error);
  }
}
// Get detail photo.
const getDetailPhoto = async(data, token) => {
  const config = requestConfig("GET", data, token);  
  try {
    const res = await fetch(api + "/photos/" + data, config)
      .then((res) => res.json())
      .catch((err) => err)
      return res;
  } catch (error) {
    console.log(error);
  }
}
// Delete especific photo.
const deletePhoto = async(id_photo, token) => {
  const config = requestConfig("DELETE", id_photo, token);
  try {
    const res = await fetch(api + "/photos/" + id_photo, config)
      .then((res) => res.json())
      .catch((err) => err)
    return res;
  } catch (error) {
    console.log(error);
  }
}
// Update a photo
const updatePhoto = async(data, id, token) => {
  const config = requestConfig("PUT", data, token);  
  try {
    const res = await fetch(api + "/photos/" + id, config)
      .then((res) => res.json())
      .catch((err) => err)
    return res;
  } catch (error) {
    console.log(error);
  }
}
// Like a photo.
const likeAPhoto = async(id, token) => {
  const config = requestConfig("POST", null, token);

  try {
    const res = await fetch(api + "/photos/action/like/" + id, config)
      .then((res) => res.json())
      .catch((err) => err);
    return res;
  } catch (error) {
    console.log(error);
  }
}
// Add comment to a photo.
const commentAPhoto = async(data, id, token) => {
  const config = requestConfig("POST", data, token);  
  try {
    const res = await fetch(api + "/photos/action/comment/" + id, config)
      .then((res) => res.json())
      .catch((err) => err);
    return res;
  } catch (error) {
    console.log(error);
  }
}
// Search photo by title.
const searchPhotos = async(query, token) => {
  const config = requestConfig("GET", null, token);
  try {
    const res = await fetch(api + "/photos/queryphotos?q=" + query, config)
      .then((res) => res.json())
      .catch((err) => err);
      return res;
  } catch (error) {
    console.log(error);
  }
}
// Exports methods about photoService
const photoService = {
  createPost,
  getPosts,
  getUserPhotos,
  deletePhoto,
  getDetailPhoto,
  updatePhoto,
  likeAPhoto,
  commentAPhoto,
  searchPhotos
}

export default photoService;
