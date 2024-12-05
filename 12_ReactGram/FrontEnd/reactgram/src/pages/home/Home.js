// Styles
import './home.css'
import styles from './home.module.css'

// Hooks
import React from 'react'
import { Link } from 'react-router-dom'
import { uploads } from '../../utils/config';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect, useRef } from 'react';
import { useResetComponentMessage} from '../../hooks/useResetComponentMessage';

// Components
import Message from '../../components/Message';
import Post from '../../components/Post';
import PhotoItem from '../../components/PhotoItem';
import LikeContainer from '../../components/LikeContainer'

// Redux
import { getPosts, likeAPhoto } from '../../slices/photoSlice';
import { user } from '../../slices/authSlice';



const Home = () => {
  // initialize functions
  const dispatch = useDispatch();
  const resetMessage = useResetComponentMessage(dispatch);
  //const navigate = useNavigate();

  // call all variables type use state  
  const { 
    photo,
    photos,
    loading,
    error,
    message,
    success
  } = useSelector((state) => state.photo);    

  const { 
    user: userAuth,
    loading: authLoading,
    error: authError,
    success: authSuccess
  } = useSelector((state) => state.auth);

  const [listPosts, setListPosts] = useState([]);

  useEffect(() => {
    dispatch(getPosts())
    setListPosts(photos);
  }, [dispatch])

  useEffect(() => {
    if(photo){
      setListPosts(photo.data);
    }
  }, [photo])

  // Handle with likes
  const handleLike = ({id}) => {
    // Implement like logic here.
    
    // Tentando dar Like da foto.
    console.log('tentando dar like na phot id: ', id);
    //dispatch(likeAPhoto(id));
    resetMessage();
  }

  // console.log(listPosts);

  return (
    <div className="home">      
      {listPosts && listPosts.length >= 0 &&
        listPosts.map((photo, index) => (
          <div key={photo._id}>
            <PhotoItem photo={photo} key={index}/>
              
            <LikeContainer photo={photo} user={userAuth} handleLike={handleLike}/>
          </div>
        ))
      }
      {listPosts && listPosts.length === 0 &&
        <h2 className="no-photos">
          Ainda não há fotos publicadas.
        </h2>
      }
      {!loading && listPosts &&
        <Post list={listPosts} />
      }
      {error &&
        <Message msg={error} type="error" />
      }
    </div>
    
  )
}

export default Home