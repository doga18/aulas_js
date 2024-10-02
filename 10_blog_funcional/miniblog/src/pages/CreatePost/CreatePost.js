import React from 'react'
import styles from './CreatePost.module.css'

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"
// Usando o hook para pegar os dados do usuário da sessão.
import { useAuthValue } from '../../context/AuthContext';
// Importando o hook de inserção de dados.
import { useInsertDocument } from '../../hooks/useInsertDocuments';

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const [message, setMessage] = useState("");

  // Pegando os dados do usuários
  const {user} = useAuthValue()
  // Destruturando para usar.
  const { insertDocument, response } = useInsertDocument("posts")
  // Usando o navigate para redirecionar o usuário após a postagem.
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("")
    setMessage("");

    // Validate image Url
    try {
      new URL(image)
    } catch (error) {
      setFormError("A imagem precisa ser uma URL válida.")
    }
    // criar o array de tags
    // Verificamos se existem palavras usadas como hashtags
    if(tags.length <= 0){
      setFormError("Você precisa informar as #tags do seu post")
      return
    }
    // Aqui eu removo os espaços que possam existir no começo ou no fim.
    const new_tags = tags.trim()
    // Aqui para cada palavra, removo o espaço de cada palavra, formando o array.
    const list_tags = new_tags.split(',').map((tag) => tag.trim().toLowerCase(tag))
    
    console.log(list_tags)

    // checar todos os valores

    if(!title || !image || !body || !tags){
      setFormError("Todos os campos devem ser preenchidos corretamente")
      return
    }

    // Verificando se o formError tem conteúdo, se conter, dar um return ali parando o processo.
    if(formError){
      console.log('erro de forumlários')
      return
    };

    const document_New = {
      title,
      image,
      body,
      list_tags,
      uid: user.uid,
      createdBy: user.displayName
    }

    insertDocument({document_New}).then(() => {
      //console.log("Post Realizado, disparado após o then");
      setMessage("Post Realizado")
      navigate('/dashboard')
    }      
    ).catch((e) => {
      console.log("Ocorreu um erro", e.message)
      }
    )    
  }

  useEffect(() => {
    if(response.error){
      setError(response.error)
    }
  }, [response.error])

  // useEffect(() => {
  //   if(response.loading === false && response.error === null){
  //     setMessage("Post Realizado")      
  //   }
  // }, [response])

  // Só para eviar os erros até criar a função específica.
  // setError(null);
  // setLoading(null);

  return (
    <div className={styles.create_post}>
        <h1>
            Criar Post
        </h1>
        <p>Escreva sobre oque quiser e compartilhe o seu conhecimento!</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="titlePost">
            <span>Título:</span>
            <input 
              type="text" 
              name="titlePost" 
              id="titlePost" 
              placeholder='Pense em um título...'
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              />
          </label>
          <label htmlFor="imagePost">
            <span>URL da imagem:</span>
            <input 
              type="text"
              name="imagePost"
              required
              placeholder='Insira a imagem que representa seu post.'
              src="../" 
              alt="example_img"
              onChange={(e) => setImage(e.target.value)}
              value={image}
              />
          </label>
          <label htmlFor="bodyPost">
            <span>Conteúdo:</span>
            <textarea
              name="bodyPost"
              id="bodyPost"
              required
              placeholder='Conteúdo do post.'
              onChange={(e) => setBody(e.target.value)}
              value={body}
              />
          </label>
          <label htmlFor="tagsPost">
            <span>#HashTags</span>
            <input 
              type="text"
              name="tagsPost"
              
              placeholder='Crie #hashtags separados por vírgula.'
              onChange={(e) => setTags(e.target.value)}
              value={tags}
              />
          </label>
          {response.error && 
            <>
              {response.error}
            </>
          }
          {response.loading && 
            <>
              {response.loading}
            </>
          }
          {message && 
            <div className={styles.messages}>
              {message}
            </div>            
          }
          {loading && 
            <button disabled>Aguarde</button>
          }
          {!response.loading &&
            <button type="submit" className='btn btn-success'>Postar</button>
          }          
          <Link to="/dashboard">
            <button className='btn btn-danger'>Voltar</button>
          </Link>

          {response.error && <p className='error'>{response.error}</p>}
          {formError && <p className='error'>{formError}</p>}
          
        </form>
    </div>
  )
}

export default CreatePost 