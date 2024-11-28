// Styles
import './profile.css'
import { styles } from './profile.module.css'
import React from 'react'

// Components
import Message from '../../components/Message';
import { uploads } from '../../utils/config';
import { Link } from 'react-router-dom';
import { BsFillEyeFill, BsPencilFill, BsXLg } from 'react-icons/bs';

// Hooks
import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

// Redux
import { getDetailsProfile, resetMessage } from '../../slices/userSlice';

const Profile = () => {
  const { id } = useParams();

  // Redux
  const { user, loading } = useSelector((state) => state.user);
  const { user: userAuth } = useSelector((state) => state.auth);  

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDetailsProfile(id));
  }, [dispatch, id])

  console.log(user.username);

  return (
    <div id="profile">
      {loading && <p>Loading...</p>}
      {!loading && 
        <div className="profile-header">
          <div className="profile-description">
            <h2>{user.username}</h2>
            <p>{user.bio}</p>
          </div>
          <img 
            src={`${uploads}/users/${user.profileImage}`}
            alt={user.username}
            title={user.username}
            className="profileImage"
            >
          </img>
        </div>
      }      
    </div>
  )
}

export default Profile