//import React, { useState } from 'react'

// Vou usasr o usenavigate para redirecionar o usuário para jogar para a página de busca.
// hook useavigate
import {useNavigate} from 'react-router-dom';
// O use state, serve para pegar o input do usuário para jogar na busca.
import { useState } from 'react';

const SerachForm = () => {
  const navigate = useNavigate();
  // Usando o useState para pegar a consulta do formulário do usuário
  const [query, setQuery] = useState()

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(`Valor enviado pelo formulário: ${e.target[0].value}`)
    console.log(`Valor setado no query ${query}`);

    // Aqui quando começar a buscar, jogar o usuário para a página de busca.

    navigate("/search?q=" + query);

  }

  return (
    <div>
        Busco por Parametros na URL

        <form onSubmit={handleSubmit}>
          <label htmlFor="search">
            Procurar
            <input type="text" name='search' onChange={(e) => (setQuery(e.target.value))}/>
          </label>
          <button type='submit'>Procurar</button>
        </form>


    </div>
  )
}

export default SerachForm