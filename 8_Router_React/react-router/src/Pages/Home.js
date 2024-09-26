import React from 'react'
// Importando o link da Dom
import {Link} from 'react-router-dom'

// importando o hook custom
import {useFetch} from '../hooks/useFetch'

// Importando o CSS do component.
import './Home.css'

const Home = () => {
  // 3 - carregamento de dados.
  // url
  const url = 'http://localhost:3001/products'

  // Desestrutuando as variáveis do useFetch
  // data: items, na verdade eu busco o data e dou outro nome pra ele, no caso items.
  const {data: items, httpConfig, loading, errors} = useFetch(url);

  return (
    <div>
        <h1>
          Listando Produtos!
        </h1>
        <h2>
          {!errors && loading && <span>Carregando produtos, aguarde.</span>}
          {errors && <div className="erros">
            <span>
              Falha ao carregar os dados, API fora do ar.
              {errors}
            </span>
          </div>
          }
        </h2>
        <ul className="product">
          {items && 
            items.map((item) => (              
                <li key={item.id}>
                  <h2>{item.name}</h2>
                  <p>R$: {item.price}</p>
                  <Link to={`/product/${item.id}`}>Detalhes</Link>
                </li>              
            ))
          }
        </ul>
        
        {!items && <h2>Sem Itens</h2> }        
    </div>
  )
}

export default Home