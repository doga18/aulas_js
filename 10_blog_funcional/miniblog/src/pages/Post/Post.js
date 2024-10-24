import React from 'react'
import styles from './Post.module.css'

//hooks
// import { useState, useEffect } from 'react';
// Usando o params para ler a url da página
import { useParams } from 'react-router-dom';
import { useFetchDocument } from '../../hooks/useFecthDocument';
// Importando o componente PostDetail para trazer os detalhes do pots
// import PostDetail from '../../components/PostDetail';
import { Link } from 'react-router-dom';


const Post = () => {

    // Dessa forma eu pego todo o objeto com todas as chaves internas.
    const idPost = useParams();
    console.log(idPost.id)
    // Dessa forma eu já extraio a chave diretamente do objeto.
    const {id} = useParams();
    console.log(id)

    const { document: post, error, loading } = useFetchDocument("posts", id);
    
    console.log(post)

    //console.log(post)    

  return (
    <div className={styles.postUnic}>        
        {loading && 
            <div className={styles.loading}>
                <span>
                    Aguarde enquanto a página é carregada.
                </span>
            </div>
        }
        {error && 
            <div className={styles.error}>
                <span>
                    Erro ao realizar a busca no seu post.
                </span>
            </div>
        }
        {post && 
            <div className={styles.post}>
                {/* <PostDetail post={post} uid={post.uid} /> */}
                <h1>
                    {post.document_New.title}
                </h1>
                <img src={post.document_New.image} alt={post.document_New.title} />
                <p>{post.document_New.body}</p>
                <div className={styles.tags}>
                    {post.document_New.list_tags.map((tag) => (
                        <p key={tag} className={styles.tags}>
                            <Link to={`/search?q${tag}`}>
                                <span>#{tag}</span>
                            </Link>
                        </p>
                    ))}
                </div>
            </div>
        }


    </div>
  )
}

export default Post