import styles from "./Home.module.css"

import React, { useEffect } from 'react'

// Hooks

import { useNavigate, Link } from 'react-router-dom';
import { useState } from "react";
import { useFetchDocuments } from '../../hooks/useFetchDocuments';

// components
// Componente do Detalhes do post!

import PostDetail from "../../components/PostDetail";

const Home = () => {

  // Variável de pesquisa do usuário.
  const [query, setQuery] = useState(null);
  // Variávei que será alimentada pelo fetch na api, neste caso no firebase.
  //const [posts, setPosts] = useState([]);
  // Instanciando o hook de fetch de posts
  const {documents: posts, loading, error: errorPost} = useFetchDocuments("posts");


  const handleSearch = (e) => {
    e.preventDefault()
    console.log(`Valor escrito na busca ${query}`)
  } 

  console.log(posts);
  console.log(loading);
  console.log(errorPost);


  return (
    <div className={styles.home}>
      <h1>Veja nossos Posts mais recentes</h1>
      <form onSubmit={handleSearch} className={styles.search_form}>
        <input type="text" placeholder="Ou busque por tags..." onChange={(e) => setQuery(e.target.value)}/>
        <button className="btn btn-dark">Pesquise</button>
      </form>
      <div>
        <h2>
          
        </h2>        
        {loading && <p>Carregando...</p>}
        {posts && posts.map((post) => (
          <div className={styles.list_posts}>
            <PostDetail post={post} uid={post.uid} />
          </div>          
        ))}
        {posts && posts.length === 0 && (
          <div className="styles noposts">
            <p>Não foram encontrados posts</p>
            <Link to="/posts/create" className="btn">Crie o primeiro post</Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home