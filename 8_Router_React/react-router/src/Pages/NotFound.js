import React from 'react'

import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div>
        <h2>
            Ops, essa página não existe!
            <Link to="/">Clique aqui para voltar a página inciial.</Link>
        </h2>

    </div>
  )
}

export default NotFound