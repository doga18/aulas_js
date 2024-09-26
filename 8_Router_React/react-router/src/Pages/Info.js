import React from 'react'

// como vou usar informações oriundas da rota, importo o useParams

import { useParams } from 'react-router-dom'




const Info = () => {

    const { id } = useParams()

  return (
    <div>
        Página de informações do produto de ID {id}
    </div>
  )
}

export default Info