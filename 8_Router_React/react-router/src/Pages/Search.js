import React from 'react'

// Usando o parametro de busca da url para transformar em variável

import { useSearchParams, Link } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';

const Search = () => {
    const [searchParams] = useSearchParams();

    const url = "http://localhost:3001/products?" + searchParams;

    console.log(`endereço de busca ${url}`)

    // usando o hook para trazer o resultado da url acima.

    const {data: items, loading, errors} = useFetch(url);

  return (
    <div>
        <h1>
            Resultados da pesquisa por {searchParams}
        </h1>
        {errors}
        <div className="results">
            <span>
                Resultados:
                {items &&
                    items.map((item) => (
                        <li key={item.id}>
                            <h2>{item.name}</h2>
                            <p>R$: {item.price}</p>
                            <Link to={`/product/${item.id}`}>Detalhes</Link>
                        </li>   
                    ))
                }
                {!items && (
                    <span>Nada encontrado</span>
                )}
            </span>
        </div>
    </div>
  )
}

export default Search