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
  // Variável para informar alguma informação para o usuário.
  const [msg, setMsg] = useState(null);
  // Instanciando o navite para rediorecionamento.
  const navigate = useNavigate();


  const handleSearch = (e) => {
    e.preventDefault()
    if(query){
      navigate(`/search?q=${query}`)
    }else{
      setMsg("Para realizar a pesquisa, você informar oque deseja pesquisar.")
    }
  }

  useEffect(() => {
    
  }, [msg])

  return (
    <div className={styles.home}>
      <h1>Veja nossos Posts mais recentes</h1>
      <form onSubmit={handleSearch} className={styles.search_form}>
        <input type="text" placeholder="Procure por #tags ou Conteúdo..." onChange={(e) => setQuery(e.target.value)}/>
        <button className="btn btn-dark">Pesquise</button>
      </form>
      {msg && 
        <div className="msg">
          <span>
            {{msg}}
          </span>
        </div>
      }      
      <div>        
        {loading && <p>Carregando...</p>}
        {posts && posts.map((post) => (
          <div className={styles.list_posts} key={post.id}>
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