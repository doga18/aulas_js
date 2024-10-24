import React from 'react'
import styles from './Dashboard.module.css'

// Hooks Defaults
// import { onAuthStateChanged } from 'firebase/auth'
import { useEffect } from 'react'
import { Link } from 'react-router-dom';

// Hooks Personally
import { useAuthValue } from '../../context/AuthContext'
import { useFetchDocuments } from '../../hooks/useFetchDocuments'



const Dashboard = () => {  

  // Pegando o usuário
  const { user } = useAuthValue();
  const uid = user.uid;
  console.log(`Id do user é ${uid}`);

  // using that hook to get documents with created by id user
  const {documents: posts, error, loading} = useFetchDocuments("posts", null, uid);

  useEffect(() => {

  }, [])

  console.log(posts);

  return (
    <div className={styles.dashboard}>
        <h1>
            Bem vindo <span className={styles.name_user}>{user.displayName}</span>, confira abaixo os posts criados por você!
        </h1>
        {posts && posts.length === 0 ? (
          <div className={styles.no_posts_user}>
            <span>Não foram encontrados posts para seu usuário.</span>
            <Link to={`/posts/create`} className={styles.btn}>Criar primeiro Post</Link>
          </div>
        ) : (
          <div className="text">Tem posts</div>
        )}
        {loading && <p>Carregando...</p>}
        {error && <p>Desculpe, um erro ocorreu: {error}</p>}

        {posts && !posts.length === 0 && <div className="algo">encontrado aglo</div> }
    </div>
  )
}

export default Dashboard