import React from 'react'

import { useState, useEffect } from 'react';

const Post = ({list}) => {

  const [listPosts, setListPosts] = useState('');

  useEffect(() => {
    if(list){
      setListPosts(list);
    }
  }, [list])

  //console.log("Dados carregados!", listPosts);

  return (
    <div className='posts'>
      
    </div>
  )
}

export default Post