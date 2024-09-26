import React from 'react'

// Importando o link para criar o botão de voltar.

import { Link } from 'react-router-dom';

// Pegando os valores via parametro.

import { useParams } from 'react-router-dom';

import { useFetch } from '../hooks/useFetch';

const Product = () => {

  // consultando o parametro informado na rota.

  const { id } = useParams();

  const url = `http://localhost:3001/products/${id}`;
  console.log(url);

  // Pegando os dados referentes a id, utiliznado também a url locao + o id.
  const {data: product, loading, errors} = useFetch(url);

  // Verificando oque o resultado do fetch traz.
  // console.log(product);

  console.log(`O parametro informado foi ${id}`)

  

  return (
    <div>
      {errors && 
        <h1>
          <span className="errors"></span>
        </h1>
      }
      {loading && <div className="loading">
        <h1>Carregando dados do produto.</h1>
      </div> }
      {!errors && product && 
      <div className="product">
        <form >
          <label htmlFor="name_product">
            Nome: <input type="text" name='name_product' value={product.name} />
            <small>Nome do produto</small>
          </label>
          <label htmlFor="price_product">
            R$: <input type="text" name='price_product' value={product.price} />
            <small>Preço do produto.</small>
          </label>
          {/* 6 - nested routes */}
          <Link to={`/product/${product.id}/info`}>Mais informações.</Link>
          <label htmlFor="id">
            <input type="hidden" name='id' value={product.id} />
          </label>          
          <button type='submit'>Atualizar</button>
          <button type='submit'>Deletar</button>
        </form>
      </div>
      }         
      <Link to="/">Home</Link>      
    </div>
  )
}

export default Product