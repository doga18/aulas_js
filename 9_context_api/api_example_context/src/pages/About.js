import React from 'react'

// importei o módulo do react para uso
//import { useContext } from 'react'
// import o context personalizado para uso e manipulação
//import { CounterContext } from '../context/CounterContex'

// Refatorando sozinho o CounterContext para uso do hook useCounterContext
// Importando o hook

import { useCounterContext } from '../hooks/useCounterContext'

// Importando o hook para ser usado (IMPORTAR NÃO QUER DIZER QUE ESTÁ EM USO!)
import { useTitleColorContext } from '../hooks/useTitleColotContext';

const About = () => {

  // deestruturação do context personalizado para uso.
  // Essa linha abaixo foi comentada, pois foi refatorado o código para ser utilizar o hook, ao invés do context direto.
  // const {counter, setCounter} = useContext(CounterContext);
  const {counter, setCounter} = useCounterContext();

  // Agora que foi devidamente importado, pode ser usado!

  const {color} = useTitleColorContext();

  return (
    <div>
        <h1 className="title" style={{color: color}}>
          Página Home
        </h1>

        <span>
          <h2>
            Se você quiser subir o counter, basta clicar no botão abaixo.
          </h2>
          <span>
            <button onClick={() => setCounter(counter + 1)}>
              Aumenta o contador.
            </button>
          </span>
        </span>

    </div>
  )
}

export default About