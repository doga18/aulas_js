import React from 'react'
import { useParams } from 'react-router-dom';
import { useState } from 'react';

const EditProfile = () => {  
  const {id} = useParams();
  const [userId, setUserId] = useState(id)

  const handleSubmit = (e) => {
    e.preventDefault();
    
  }

  console.log(id);
  return (
    <div>
      <h1>Editar Perfil {userId}</h1>
      <p>
        Adicione uma imagem de Perfil ou atualize-a e conte mais sobre você...
      </p>
      <hr />
        <div className="profile-image">
          <img src="" alt="Essa é a imagem" />
        </div>
        Imagem preview
      <hr />      
      <form onSubmit={handleSubmit} className="edit">
        <input type="text" name="name" id="name" placeholder="Nome" />
        <input type="email" name="email" id="email" placeholder="E-mail" />
        <label htmlFor="image">
          <span className="perfil_image">
            <input type="file" name="image" id="image" />            
          </span>          
        </label>
        <label htmlFor="description">
          <span>Bio</span>
          <input type="text" name="description" id="description" placeholder="Descrição do perfil" />
        </label>
        <label htmlFor="password">
          <span>Altere sua senha?</span>
          <input type="password" name="password" id="password" />
        </label>
        <button type="submit">Atualizar Perfil</button>
      </form>
    </div>
  )
}

export default EditProfile