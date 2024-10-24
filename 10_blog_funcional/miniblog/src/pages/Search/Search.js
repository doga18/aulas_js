import React from 'react'
import styles from './Search.module.css'
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';
import { useQuery } from '../../hooks/useQuery';
// Post Detail
import PostDetail from '../../components/PostDetail';

const Search = () => {

    const navigate = useNavigate();

    const query = useQuery();
    const search = query.get("q");
    const [newSearch, setNewSearch] = useState('');
    const [msg, setMsg] = useState(null);
    const {documents: posts, loading, error} = useFetchDocuments("posts", search);

    console.log(`O search é? ${search}`)
    console.log(posts)
   

    useEffect(() => {
      if(!posts){
        setMsg("Nada encontrado!")
      }else{
        setMsg(null);
        console.log(`valor dos postos é de ${posts.length}`)
      }
    }, [posts])

    useEffect(() => {
      if(error){
        setMsg(error)
      }
    }, [error])

    const handleNewSearch = (e) => {
      e.preventDefault()
      console.log(`O novo valor digitado na pesquisa é ${newSearch}`)
      navigate(`/search?q=${newSearch}`)
    }

  return (

    <div className={styles.search}>
      <form onSubmit={handleNewSearch}>
        <input 
          type="text"
          placeholder={search ? search : "Procure por #tags ou Conteúdo..."}          
          onChange={(e) => setNewSearch(e.target.value)}
        />
        <button className="btn btn-dark">Pesquisar</button>
      </form>
      <h1>Resultado</h1>
      {msg && 
        <div className="msg">
          <span>
            {msg}
          </span>
        </div>
      }
      {loading && 
      <div>
        <h1>
          Aguarde enquanto a busca é realizada!
        </h1>
      </div>
      }
      {posts && posts.length === 0 && (
        <div className={styles.noposts}>
          <p>Não foram encontrados posts a partir da sua busca...</p>
          <Link to="/" className="btn btn-dark">
            Voltar
          </Link>
        </div>
      )}
      {posts && 
        <div className={styles.list_posts}>
          
          {posts.map((post) => (
            <PostDetail post={post} uid={post.uid} />
          ))}
        </div>
      }
      {!posts && <div><h2>Não foram encontrados posts na busca pela tag {search}</h2></div> }
      
    </div>
  )
}

export default Search