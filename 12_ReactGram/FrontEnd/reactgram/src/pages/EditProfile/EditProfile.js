import React from 'react'
import { useParams } from 'react-router-dom';
import { uploads } from '../../utils/config';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { profile, resetMessage} from '../../slices/userSlice';

// components
import Message from '../../components/Message';

const EditProfile = () => {
  const dispatch = useDispatch();
  const {user, message, error, loading} = useSelector((state) => state.user);

  // states
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, sePprofileImage] = useState("");
  const [bio, setBio] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  // loading user data.
  useEffect(() => {
    dispatch(profile());
  }, [dispatch]);

  // fill form with user data // Preenchendo os dados com os dados oriundos do backend.

// fill form with user data
  useEffect(() => {
    if (user && message === "success") {
      // Log the user data to check if the API response is correct
      console.log('User data:', user.username);
      
      setEmail(user.email);
      setBio(user.bio);
      setPreviewImage(`${uploads}/users/${user.profileImage}`);
      setUsername(user.username);
    }
  }, [user, message]);  // Dependency array ensures this runs when 'user' or 'message' changes.


  const {id} = useParams();
  const [userId, setUserId] = useState(id)

  
  const handleSubmit = (e) => {
    e.preventDefault();
    
  }
  // Log state to check if it's updated correctly
  console.log('Username:', username);
  console.log('Email:', email);

  return (
    <div>
      <h1>Editar Perfil {username}</h1>
      <h2>{username}</h2>
      <p>
        Adicione uma imagem de Perfil ou atualize-a e conte mais sobre você...
      </p>
      <hr />
        <div className="profile-image">
          <img src="" alt="Essa é a imagem" />
        </div>
        Imagem preview{}
      <hr />      
      <form onSubmit={handleSubmit} className="edit">
        <input type="text" name="name" id="name" placeholder="Nome" onChange={e => setUsername(e.target.value)} value={username || ''} />
        <input type="email" name="email" id="email" placeholder="E-mail" onChange={e => setEmail(e.target.value)} />
        <label htmlFor="image">
          <span className="perfil_image">
            <input type="file" name="image" id="image" onChange={e => sePprofileImage(e.target.files[0])} accept="image/*" />            
          </span>          
        </label>
        <label htmlFor="description">
          <span>Bio</span>
          <input type="text" name="description" id="description" placeholder="Descrição do perfil" onChange={e => setBio(e.target.value)} value={bio || ''}/>
        </label>
        <label htmlFor="password">
          <span>Altere sua senha?</span>
          <input type="password" name="password" id="password" onChange={e => setPassword(e.target.value)} value={password || ''}/>
        </label>
        <button type="submit">Atualizar Perfil</button>
      </form>
    </div>
  )
}

export default EditProfile