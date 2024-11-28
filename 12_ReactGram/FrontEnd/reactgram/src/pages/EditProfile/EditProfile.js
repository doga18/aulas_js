import React from 'react'

import { uploads } from '../../utils/config';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { profile, updateProfile, resetMessage} from '../../slices/userSlice';
import "./EditProfile.css";

// components
import Message from '../../components/Message';

const EditProfile = () => {
  const dispatch = useDispatch();
  const {user, message, error, loading} = useSelector((state) => state.user);

  // states
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(null);
  const [profileImage, setProfileImage] = useState("");
  const [bio, setBio] = useState("");
  const [previewImage, setPreviewImage] = useState('');  

  // loading user data.
  useEffect(() => {
    dispatch(profile());
    resetMessage();
  }, [dispatch]);

  // fill form with user data // Preenchendo os dados com os dados oriundos do backend.

// fill form with user data
  useEffect(() => {
    if (user) {
      // Log the user data to check if the API response is correct
      console.log('User data:', user.username);

      setEmail(user.email);
      setBio(user.bio);
      setProfileImage(`${uploads}/users/${user.profileImage}`);
      setUsername(user.username);
      resetMessage();
    }
  }, [user, message]);  // Dependency array ensures this runs when 'user' or 'message' changes.

  const handleImagChange = (e) => {
    console.log("Usuário inseriu um arquivo.");
    
    const file = e.target.files[0];
    if(!file){
      alert("Você precisa enviar uma imagem!");      
    }else{
      console.log('uma imagem enviada.')
    }    
    const reader = new FileReader();
    reader.onload = (e) => {      
      setPreviewImage(e.target.result);
    }
    if(file){
      setProfileImage(e.target.files[0]);
    }
    reader.readAsDataURL(file);
    console.log('Dado inserido na variavel profileImage');
    setProfileImage(file);    
    //console.log(previewImage);
  }

  
  const handleSubmit = async (e) => {
    e.preventDefault();    
    // Reset error and message states.
    dispatch(resetMessage());

    // Create object to update data of the user.

    const newDataUser = {};

    if(username){
      newDataUser.username = username;
    }
    if(bio){
      newDataUser.bio = bio;
    }
    if(previewImage){
      newDataUser.profileImage = profileImage;
    }
    if(email){
      newDataUser.email = email;
    }
    if(password !== null){
      newDataUser.password = password;
    }

    // build form data object
    const formData = new FormData();

    Object.keys(newDataUser).forEach((key) => formData.append(key, newDataUser[key]));

    // Printar o conteúdo do FormData
    console.log("FormData content:");
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }
    
    await dispatch(updateProfile(formData));

    // Doyng with the mensage success reset after 5 seconds.

    setTimeout(() => {
      dispatch(resetMessage());
    }, 3000);
    
  }

  return (
    <div>
      <h1 className="title">Editar Perfil</h1>
      <div className="name_user">
        <span>{username}</span>
      </div>
      
      <p>
        Adicione uma imagem de Perfil ou atualize-a e conte mais sobre você...
      </p>
      <hr />
        <div className="profile-image">
          <label htmlFor="image">
            {previewImage && previewImage !== null && 
              <img src={previewImage} alt="Essa é a imagem" />
            }
            {!previewImage && 
              <img src={profileImage} alt="Essa é a imagem"/>
            }
          </label>
        </div>      
      <form onSubmit={handleSubmit} className="edit">
        <input type="text" name="name" id="name" placeholder="Nome" onChange={e => setUsername(e.target.value)} value={username || ''} />
        <input type="email" name="email" id="email" placeholder="E-mail" onChange={e => setEmail(e.target.value)} value={email || ''}/>
        <label htmlFor="image">
          <span className="perfil_image">
            <input 
              type="file"
              name="image"
              id="image"
              onChange={handleImagChange}
              accept="image/*"
            />
          </span>          
        </label>
        <label htmlFor="description">
          <span>Bio</span>
            <input 
              type="text" 
              name="description" 
              id="description" 
              placeholder="Descrição do perfil" 
              onChange={e => setBio(e.target.value)} 
              value={bio || ''}
            />
        </label>
        <label htmlFor="password">
          <span>Altere sua senha?</span>
            <input 
              type="password"
              name="password"
              id="password"
              onChange={e => setPassword(e.target.value)}
              value={password || ''}
            />
        </label>
        <div className="message_info">
          {message && 
            <Message msg={message} type="success" />
          }
          {error && 
            <Message msg={error} type="error" />
          }
        </div>
        {loading &&
          <button type="submit" className="btn-success" disabled>Atualizando...</button>
        }
        {!loading &&
          <button type="submit" className="btn-success">Atualizar Perfil</button>
        }        
      </form>      
    </div>
  )
}

export default EditProfile