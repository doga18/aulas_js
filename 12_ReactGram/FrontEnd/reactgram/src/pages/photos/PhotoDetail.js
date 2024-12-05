// Styles
import './PhotoDetail.css'
import React from 'react'
// hooks
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate, Link } from 'react-router-dom'
import { AiOutlineLike } from "react-icons/ai";
import { BiSolidCommentDetail } from "react-icons/bi";
import { useResetComponentMessage } from '../../hooks/useResetComponentMessage';

// components
import { files, uploads } from '../../utils/config';
import Message from '../../components/Message';
// Redux
import { getDetailPhoto, likeAPhoto, commentAPhoto } from '../../slices/photoSlice';
import PhotoItem from '../../components/PhotoItem';
import LikeContainer from '../../components/LikeContainer';

const PhotoDetail = () => {
  const { id } = useParams();  
  const dispatch = useDispatch();
  const resetMessage = useResetComponentMessage(dispatch);
  // On load this page.
  useEffect(() => {    
    dispatch(getDetailPhoto(id));    
  }, [dispatch])
  // variables to use
  const [photoDetail, setPhotoDetail] = useState(null);
  const [newComment, setNewComment] = useState('');
  // Data about that photo
  const { photo, photos, error, message, success } = useSelector((state) => state.photo)
  // Fill the photo with the detail
  useEffect(() => {
    if(photo){
      setPhotoDetail(photo);
    }
  }, [photo])
  // Create a component to display details of the photo

  // functions handlelike
  const handleLike = () => {
    // Implement like logic here.
    console.log('Like clicked!');
    // Tentando dar Like da foto.
    dispatch(likeAPhoto(photoDetail._id));
    resetMessage();    
  }
  // functions handle comment
  const handleSubmit = async (e) => {
    e.preventDefault();
    const addComment = {};
    if(newComment){
      addComment.comment = newComment;
      addComment._id = photoDetail._id;
    }

    console.log('comentário construido:', addComment);

    dispatch(commentAPhoto(addComment));
    setNewComment('');
    resetMessage();

  }
  // Isso é o método para pegar o usuário logado no sistema!
  const {user} = useSelector((state) => state.auth);
  
  return (
    <div id="photo">
      <PhotoItem photo={photoDetail} />
      <LikeContainer photo={photoDetail} user={user} handleLike={handleLike} />
      <div className="message-container">
        {error && <Message msg={error} type="error"/>}
        {message && <Message msg={message} type="success"/>}
      </div>
      <div className="comments">
        {!photo.comments && 
          <>
            <span>
              Nenhum comentário
            </span>
          </>
        }
        {photo.comments && photo.comments.length <= 0 &&
          <>
            <span>
              Nenhum comentário
            </span>
          </>
        }
        {photo.comments && photo.comments.length >= 0 &&
          <h3>Comentários {photo.comments.length}</h3>
        }        
        {photo.comments && photo.comments.length > 0 &&          
          photo.comments.map((comment, index) => (
            <div className="commentUniq" key={index}>
              <div className="author">
                {comment.userImage && (
                  <img src={`${uploads}/users/${comment.userImage}`} alt={comment.username} title={comment.username} />
                )}
                {comment && comment.username && comment.comment &&
                  <>
                    <Link to={`/profile/${comment.userId}`}>
                      {comment.username}
                    </Link>
                    <div className="commentData">
                      <span>{comment.comment}</span>
                    </div>
                  </>
                }
              </div>
            </div>
            // <span key={index}>
            //   <span className="name_comment">{comment.username}</span>
            //   <span className="comment">{comment.comment}</span>              
            // </span>            
          ))
        }

        <h4>Faça um comentário:</h4>
          <form onSubmit={handleSubmit}>
            <label htmlFor="comment">              
              <input
                type="text"
                name="comment"
                id="comment"
                onChange={(e) => setNewComment(e.target.value)} 
                required
                value={newComment || '' }
              />
              <input className="btn" type="submit" value="Comentar" />
            </label>
          </form>
      </div>
    </div>

    // <div className="details">
    //   {photo &&
    //     <div className="details_img">
    //       <div className="img_control">
    //         <div className="img">
    //           <img 
    //             src={`${files}/${photo.image}`}
    //             alt={photo.title}
    //             title={photo.title}
    //           />
    //         </div>
    //         <div className="actions">
    //           <div className="count_likes">
    //             <AiOutlineLike size={36}/>
    //             <span>12</span>
    //           </div>
    //           <div className="count_comments">
    //             <BiSolidCommentDetail size={36}/>
    //             <span>221</span>
    //           </div>
    //         </div>
    //       </div>
    //       <div className="atributes">
    //         <div className="itens_names">
    //           <span className="title">          
    //             {photo.title}
    //           </span>
    //           <span className="description">
    //             {photo.description}
    //           </span>
    //         </div>
    //         <div className="itens_interactions">
    //           <div className="coments">
    //             {!photo.comments &&
    //               <span>
    //                 Nenhum comentário
    //               </span>
    //             }
    //             {photo.comments && 
    //               <span>
    //                 { photo.comments.map((comment) => (
    //                   <span key={comment.id}>
    //                     <div className="groupComment">
    //                       <span className="nameCommentUser">
    //                         {comment.username}
    //                       </span>
    //                       <span className="commentUnicUser">
    //                         {comment.comment}
    //                       </span>
    //                     </div>
    //                   </span>
    //                 ))}
    //               </span>
    //             }
    //           </div>
    //           <div className="likes">                
    //             {!photo.likes && 
    //               <span>
    //                 Nenhum like
    //               </span>
    //             }
    //             {photo.likes && 
    //               <span>
    //                 Id de quem curtiu: {photo.likes}
                    
    //               </span>
    //             }
    //           </div>
    //         </div>
    //       </div>
          
          
    //     </div>
    //   }
    // </div>
  )
}

export default PhotoDetail

