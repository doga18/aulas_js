import React from 'react'

// hooks
import { useState, useEffect} from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { useResetComponentMessage } from '../../hooks/useResetComponentMessage';
import { useQuery } from '../../hooks/useQuery';

// components
import { getPosts, searchPhotos, likeAPhoto  } from '../../slices/photoSlice';
import LikeContainer from '../../components/LikeContainer';
import PhotoItem from '../../components/PhotoItem';
import { Link } from 'react-router-dom';

// const initialState = {
//   photos: [],
//   photo: {},
//   error: false,
//   success: false,
//   loading: false,
//   message: null
// }

const Search = () => {
  // Aqui vamos pegar a variável de busca, para enviar pro slice corretamente.
  const query = useQuery('q');
  const search = query.get('q');  
  // Para acionar o dispath;
  const dispatch = useDispatch();
  // Reset messagens
  const resetMessage = useResetComponentMessage(dispatch);
  // Usuário logado.
  const { user } = useSelector((state) => state.auth);
  const { photos: postPhotos, photo: postPhoto, error: postError, success: postSuccess, loading: postLoading, message: postMessage } = useSelector((state) => state.photo);

  useEffect(() => {
    dispatch(searchPhotos(search));
  }, [dispatch, search]);

// functions handlelike
const handleLike = () => {
  // Implement like logic here.
  console.log('Like clicked!');
  // Tentando dar Like da foto.
  dispatch(likeAPhoto(postPhoto._id));
  resetMessage();    
}

  return (
    <div>
      <h1 className="title">Resultado da Pesquisa</h1>
      {search && search.length > 0 &&
        <h2>{search}</h2>
      }
      {postLoading &&
        <h2>Carregando...</h2>
      }
      {postPhoto && postPhoto.length > 0 &&
        postPhoto.map((photo, index) => (
          <div className="item" key={index}>
            <PhotoItem photo={photo} user={user} />
            {/* //photo={photoDetail} user={user} handleLike={handleLike} */}
            <LikeContainer photo={photo} user={user} handleLike={handleLike} />
          </div>
        ))
      }
      {!postPhoto && 
        <h2>Nenhuma foto encontrada</h2>
      }
    </div>
  )
}

export default Search