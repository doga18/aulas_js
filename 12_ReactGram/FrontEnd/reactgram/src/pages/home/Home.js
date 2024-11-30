// Styles
import './home.css'
import styles from './home.module.css'

// Hooks
import React from 'react'
import { Link } from 'react-router-dom'
import { uploads } from '../../utils/config';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect, useRef } from 'react';

// Components
import Message from '../../components/Message';
import Post from '../../components/Post';

// Redux
import { getPosts } from '../../slices/photoSlice';
import { user } from '../../slices/authSlice';



const Home = () => {
  // initialize functions
  const dispatch = useDispatch();
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

  const [ listPosts, setListPosts] = useState([]);

  useEffect(() => {
    dispatch(getPosts())
    setListPosts(photos);
  }, [dispatch])

  useEffect(() => {
    if(photo){
      setListPosts(photo);
    }
  }, [photo])



  return (
    <div className="index">
      <div className="home">      
        <h1 className={styles.title}>
          Bem vindo ao ReactGram, Inspirado no Instagram.
          <p>Api Key: <Link to={process.env.REACT_APP_URL_BACKEND} target="_blank">{process.env.REACT_APP_URL_BACKEND}</Link></p>
        </h1>
        <span className={styles.subtitle}>Para Acessar, Faça seu <Link to="/login">Login</Link> ou <Link to="/register">Crie sua conta.</Link></span>
      </div>
      {loading &&
        <div className={styles.loading}>
          <span>
            Aguarde enquanto a página é carregada.
          </span>
        </div>
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