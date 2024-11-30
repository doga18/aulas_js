// Styles
import './profile.css'
import styles from './profile.module.css'
import React from 'react'

// Components
import Message from '../../components/Message';
import PhotoDetail from '../photos/PhotoDetail';
import { uploads, files } from '../../utils/config';
import { Link } from 'react-router-dom';
import { BsFillEyeFill, BsPencilFill, BsXLg } from 'react-icons/bs';

// Hooks
import { useState, useEffect, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

// Redux
import { getDetailsProfile, resetMessage as rmUser } from '../../slices/userSlice';
import { newPost, resetMessage as rmPhoto, getUserPhotos, deletePhoto } from '../../slices/photoSlice';

const Profile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux
  // Dados do user.
  const { user: userData, loading: userLoading, error: userError, message: userMessage } = useSelector((state) => state.user);
  // Dados do usuário autenticado.
  const { user: userAuth, loading: authLoading, error: authError, message: authMessage } = useSelector((state) => state.auth);
  // Dados do post.
  const { photo: photo, photos: photos, message: photoMessage, error: photoError } = useSelector((state) => state.photo);
  // Dados sobre todos as fotos do usuário.  

  // Create ref about new Photo.
  const newPhotoForm = useRef();
  const editPhotoForm = useRef();

  // Create and handle with useStates.
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imagePost, setImagePost] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [message, setMessage] = useState('');

  // load data about user.
  useEffect(() => {
    dispatch(getDetailsProfile(id));
    dispatch(getUserPhotos(id));

    setTimeout(() => {
      setErrorMsg(null);
      setMessage(null);
    }, 3000);

  }, [dispatch, id])

  // useEffect to handle withs errors
  useEffect(() => {
    if(userError){
      setErrorMsg(userError);
    }
    if(photoError){
      setErrorMsg(photoError);
    }
    if(authError){
      setErrorMsg(authError);
    }
  }, [userError, photoError, authError])
  // useEffect to handle with's loading!
  useEffect(() => {
    if(userLoading){
      setErrorMsg(null);
    }
    if(photoMessage){
      setErrorMsg(null);
    }
    if(authLoading){
      setErrorMsg(null);
    }
  }, [userLoading, photoMessage, authLoading])
  // useEffect to handle withs messages!
  useEffect(() => {
    if(userMessage){
      setMessage(userMessage);
    }
    if(photoMessage){
      setMessage(photoMessage);
    }
    if(authMessage){
      setMessage(authMessage);
    }
  }, [userMessage, photoMessage, authMessage])

  // Set data in variables;

  // Functions
  // Handle whith a file about photo to insert.
  const handlePhotoFile = (e) => {
    console.log('Tentativa de enviar uma foto.')  
    const fileInput = e.target;
    const file = e.target.files[0];
    const AcceptedFiles = ['image/jpg', 'image/png', 'image/jpeg', 'image/raw'];
    if(!AcceptedFiles.includes(file.type)){
      alert('Formato de imagem inválido. Use apenas PNG, JPEG ou JPG.');
      setImagePost(null);
      fileInput.value = '';
      return;
    }
    if(AcceptedFiles.includes(file.type)){
      setImagePost(file);
      return;
    }
  }

  // Handle with the formData build and send.
  const handleSubmit = async(e) => {
    e.preventDefault();
    const formPhotoPost = {};

    if(title){
      formPhotoPost.title = title;
    }
    if(description){
      formPhotoPost.description = description;
    }

    formPhotoPost.image = imagePost;

    if(!imagePost){
      alert('Adicione uma imagem para compartilhar.');
      return;
    }

    // build formData object
    const formData = new FormData();

    Object.keys(formPhotoPost).forEach((key) => formData.append(key, formPhotoPost[key]));

    await dispatch(newPost(formData));

    setTimeout(() => {      
      setErrorMsg(null);
      setMessage(null);
    }, 3000);
  }

   // Handle to delete file
  const handleDeleteFile = async(id) => {    
    try {
      if(window.confirm("Você tem certeza que quer deletar essa foto?")){
        await dispatch(deletePhoto(id));        
      }      
    } catch (error) {      
      console.log(error);
    } finally {
      setTimeout(() => {
        setErrorMsg(null);
        setMessage(null);
      }, 3000);
    }
  }

  //console.log(photos[1].description);

  const handlePhotoDetail = async(id) => {
    <PhotoDetail id={id} />
  }

  if(userLoading){
    return <p>Carregando...</p>
  }

  return (
    <div id="profile">
      {userLoading && <p>Loading...</p>}
      {errorMsg && <p>Error</p>}
      {!userLoading && userData &&
        <div className="profile-header">    
          <img 
              src={`${uploads}/users/${userData.profileImage}`}
              alt={userData.username}
              title={userData.username}
              className="profileImage"              
              >
          </img>          
          <div className="profile-description">
            <h2>{userData.username}</h2>
            <p>{userData.bio}</p>
          </div>
        </div>
      }
      {id === userAuth._id &&
        <>
          <div className="new-photo" ref={newPhotoForm}>
            <h3>Compartilhe algum momento seu</h3>
            <form onSubmit={handleSubmit} className="new-photo-form">
              <label htmlFor="photoTitle">
                <span>Título da Foto:</span>
                <input 
                  className="input"
                  type="text"
                  id="photoTitle"
                  placeholder="Insira um título"
                  onChange={(e) => setTitle(e.target.value)}
                  value={ title || ''}
                />
              </label>              
              <label htmlFor="image">
                <span>Imagem</span>
                <input
                  type="file"
                  name="image"
                  id="image"
                  onChange={handlePhotoFile}
                  accept="image/png|image/jpeg|image/jpg"
                />
              </label>
              <label htmlFor="description" className="description">
                <span>Descrição: </span>                
                <textarea
                  name="description"
                  id="description"
                  placeholder="Insira uma descrição para sua foto."
                  onChange={(e) => setDescription(e.target.value)}
                  value={description || ''}
                  />
              </label>
              {message && <Message msg={message} type="success"/>}
              {errorMsg && <Message msg={errorMsg} type="error"/>}
              {userLoading &&
                <input type="submit" value="Aguarde" className="btn-success" id="btn-post" disabled/>
              }
              {!userLoading &&
                <input type="submit" value="Postar" className="btn-success" id="btn-post"/>
              }
            </form>            
          </div>
          <div className="user-photos">
            <h2>Fotos Publicadas</h2>
            <div className="photos-container">
              {photos && photos.map((item) => (                
                <div className="photo" key={item._id}>
                  {item.image && (
                    <img
                      src={`${files}/${item.image}`}
                      alt={item.title} title={item.title}/>
                    )}
                    {id === userAuth._id ? (
                      <div className="actions">
                        <Link to={`/photos/${item._id}`}>
                          <BsFillEyeFill />
                        </Link>                        
                        <Link to={`/photos/edit/${item._id}`}>
                          <BsPencilFill />
                        </Link>
                        <BsXLg onClick={() => handleDeleteFile(item._id)}/>

                      </div>
                    ) : (
                        <Link className="btn" to={`/profile/${userAuth._id}`}>
                          Ver
                        </Link>
                    )}
                </div>                
              ))}              
            </div>
            <div className="non-photos">
              {!photos && 
                <p>Você ainda não possui fotos publicadas.</p>
                // import { BsFillEyeFill, BsPencilFill, BsXLg } from 'react-icons/bs';
              }
            </div>
          </div>
        </>
      }
    </div>
  )
}

export default Profile