import styles from "./PostDetail.module.css"

import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

// hook para trazer informação única.
// import { useFetchDocument } from '../hooks/useFecthDocument';

// Aqui colocamos para receber o filho (propos) antes de carregar esse componente.
const PostDetail = ({post}) => {
    
    //const [document, setDocument] = useState(null);

    //const {document: post, error, loading} = useFetchDocument("posts", post.uid)
    console.log(post)
  return (    
    <div>
        <div className={styles.posts}>            
            <h1>            
            {post.document_New.title}
            </h1>
            <Link to={`/post/${post.id}`}>
                <img src={post.document_New.image} alt={post.document_New.title} />
            </Link>
            <div className={styles.body}>
                <p>{post.document_New.body}</p>    
            </div>
            <div className={styles.tags}>
                {post.document_New.list_tags.map((tag) => (
                    <span key={tag}>
                        <Link to={`/search?q=${tag}`}>#{tag}</Link>                        
                    </span>
                ))}
            </div>
            <div className={styles.createdUser}>
                Criado por <Link to={`/dashboard/${post.document_New.uid}`}>{post.document_New.createdBy}</Link>
            </div>
            <Link to={`/posts/${post.id}`} className={`btn btn-outline`}>Ler</Link>
        </div>
        
    </div>
  )
}

export default PostDetail