import React, { useState, useEffect, ChangeEvent } from 'react'



const State = () => {

  const [text, setText] = useState<string | null>('testando o hook');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleMessage = () => {
    console.log('Texto:', text);
    alert(`Texto: ${text}`);
    setText('');  // Limpa o texto ao mostrar o alerta
  }

  useEffect(() => {
    if(text){
      console.log('Texto alterado:', text);
    }
  }, [text, setText]);

  return (
    <div>
      <h1>Meu primeiro componente com Typescript</h1>
        <p>{text}</p>
        <input type="text" onChange={handleChange} />
        <button onClick={() => setText('')}>Limpar Texto</button>
        <button onClick={handleMessage}>Mostrar o resultado!</button>
    </div>
  )
}

export default State