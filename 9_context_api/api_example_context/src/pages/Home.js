import React from 'react'
// Importando o css

import './Home.css'

// Importando as ferramentas do context para exibir o conteúdo do contador na home.
// import { useContext } from 'react';
// import { CounterContext } from '../context/CounterContex';
// Temos outra forma de utilizar que é utiliznado o hook, sendo assim, vamos importar o hook

import { useCounterContext } from '../hooks/useCounterContext';

// context mais complexo

import { useTitleColorContext } from '../hooks/useTitleColotContext';

// Importando o component para verificando o context.
import ChangeCounter from '../Components/ChangeCounter';

const Home = () => {
  // Preciso deestruturar o counterContext
  //const { counter } = useContext(CounterContext);
  const {counter} = useCounterContext();

  // 5 - extrair dados mais complexos do hook useTitle...

  const { color, dispatch } = useTitleColorContext();

  // alterando state completo

  const setTitleColor = (color) => {
    dispatch({type: color});
  }

  console.log(`valor extraido é ${color}`)

  return (
    <div>
        <h1>
          <h1 className="title" style={{color: color}}>
            Página Home
          </h1>
            
            <div className="valor_context">
              <span>
                Valor do contexto: {counter}
              </span>
              <span>
                <ChangeCounter />
                {/* 6 - alterando contexto complexo */}
                <button onClick={() => setTitleColor("RED")}>Vermelho</button>
                <button onClick={() => setTitleColor("BLUE")}>Azul</button>
              </span>
            </div>
        </h1>
    </div>
  )
}

export default Home