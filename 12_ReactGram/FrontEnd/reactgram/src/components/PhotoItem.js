//styles
import './PhotoItem.css'
import styles from './PhotoItem.module.css';

// hooks
import React from 'react'
import { Link } from 'react-router-dom';
import { uploads, files } from '../utils/config';

// Redux
import { photoSlice } from '../slices/photoSlice';
import { useSelector } from 'react-redux';

const PhotoItem = ({photo}) => {

  const { photo: photoAtt, photos, loading, error, message, success } = useSelector((state) => state.photo)

  return (
    <div className="photo-item">
      {photo &&
          <img src={`${files}/${photo.image}`} alt={photo.title} title={photo.title} />
      }
      {photo &&
        <div>
          <h2>
            {photo.title}
          </h2>
          <p className="photo-author">
            Publicada por: <Link to={`/profile/${photo.userId}`}>{photo.userName}</Link>
          </p>        
        </div>
      }
    </div>
  )
}

export default PhotoItem