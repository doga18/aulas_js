// Chamando o express
const express = require('express');
// Inicializando o Express.
const app = express();
// Porta da aplicação.
const port = 4000;
// Preparando a api para ler objetos json.
app.use(
  express.urlencoded({
    extended: true,
  })
)
app.use(express.json());













// Rota inicial.
app.get('/', (req, res) => {
  res.json({
    message: 'Hello World!'
  });
})


app.listen(port, () => {
  console.log('Listening on http://localhost:' + port);
})