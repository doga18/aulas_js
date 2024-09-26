// 3 - alterando o contexto e valor

// Aqui importo o useContext do react para poder manipular o context.
import { useContext } from "react";

// Aqui eu importo o context de fato, que vou ler e manipular o mesmo.
import { CounterContext } from "../context/CounterContex";

import React from 'react'

const ChangeCounter = () => {
    // Colmo eu importei o contexto CounterContext, agora posso deestruturar o mesmo para usar e seu set.

    const {counter, setCounter} = useContext(CounterContext);
    

  return (
    <div>
        <h1>
            Manipulando o Context, esse é o valor do context 
        </h1>
        <span>
            <button onClick={() => setCounter(counter + 1)}>Aumentar o valor</button>
        </span>
    </div>
  )
}

export default ChangeCounter

