import React from 'react'
import './LikeContainer.css'

// Components
import { BsHeart, BsHeartFill } from 'react-icons/bs'


const LikeContainer = ({photo, user, handleLike}) => {
  return (
    <div className="like">
      {photo && photo.likes && user &&
        <>
          {photo.likes.includes(user._id) ? (
            <BsHeartFill />
          ) : (
            <BsHeart onClick={() => handleLike()}/>
          )}
          <p>{photo.likes.length} like(s)</p>
        </>
      }
    </div>
  )
}

export default LikeContainer