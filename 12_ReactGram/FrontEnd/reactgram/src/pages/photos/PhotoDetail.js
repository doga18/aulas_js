// Styles
import './PhotoDetail.css'
import React from 'react'
// hooks
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom'
import { AiOutlineLike } from "react-icons/ai";
import { BiSolidCommentDetail } from "react-icons/bi";

// components
import { files } from '../../utils/config';
// Redux
import { getDetailPhoto } from '../../slices/photoSlice';

const PhotoDetail = () => {
  const { id } = useParams();
  console.log(id);
  const dispatch = useDispatch();
  // On load this page.
  useEffect(() => {    
    dispatch(getDetailPhoto(id));    
  }, [dispatch])
  // variables to use
  const [photoDetail, setPhotoDetail] = useState(null);  
  // Data about that photo
  const { photo, photos, error, message, success } = useSelector((state) => state.photo)
  // Fill the photo with the detail
  useEffect(() => {
    if(photo){
      setPhotoDetail(photo);
    }
  }, [photo])

  console.log(photo);

  return (    
    <div className="details">      
      {photo &&
        <div className="details_img">
          <div className="img_control">
            <div className="img">
              <img 
                src={`${files}/${photo.image}`}
                alt={photo.title}
                title={photo.title}
              />
            </div>
            <div className="actions">
              <div className="count_likes">
                <AiOutlineLike size={36}/>
                <span>12</span>
              </div>
              <div className="count_comments">
                <BiSolidCommentDetail size={36}/>
                <span>221</span>
              </div>
            </div>
          </div>
          <div className="atributes">
            <div className="itens_names">
              <span className="title">          
                {photo.title}
              </span>
              <span className="description">
                {photo.description}
              </span>
            </div>
            <div className="itens_interactions">
              <div className="coments">
                {!photo.comments &&
                  <span>
                    Nenhum comentário
                  </span>
                }
                {photo.comments && 
                  <span>
                    { photo.comments.map((comment) => (
                      <span key={comment.id}>
                        <div className="groupComment">
                          <span className="nameCommentUser">
                            {comment.username}
                          </span>
                          <span className="commentUnicUser">
                            {comment.comment}
                          </span>
                        </div>
                      </span>
                    ))}
                  </span>
                }
              </div>
              <div className="likes">                
                {!photo.likes && 
                  <span>
                    Nenhum like
                  </span>
                }
                {photo.likes && 
                  <span>
                    Id de quem curtiu: {photo.likes}
                    
                  </span>
                }
              </div>
            </div>
          </div>
          
          
        </div>
      }
    </div>    
  )
}

export default PhotoDetail

