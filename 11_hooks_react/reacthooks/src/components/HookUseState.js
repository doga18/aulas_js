import React from 'react'
import { useState } from 'react';

const HookUseState = () => {
  // 1 - useState
  let userName = "Joaquim";

  const [name, setName] = useState('Mateus');

  const changesNames = () => {
    userName = "joão souza"
    setName('Joaquim barriga')
  }

  return (
    <div>
      <h2>useState</h2>
        <p>Variável: {userName}</p>
        <p>useState: {name}</p>
        <button onClick={changesNames}>Mudar nome</button>
    </div>
  )
}

export default HookUseState