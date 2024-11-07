// Importando o express para montar a API.
const express = require("express");
const app = express();
// Importando o path para lidar com os arquivos de imagem e vídeos.
const path = require("path");
// Importando o cors;
const cors = require("cors");
// Importando o dotenv para pegar as variáveis de ambiente.
require("dotenv").config();

// Pegando a porta do projeto, oriunda do dotenv.
const PORT_PROJECT = process.env.PORT_PROJECT;

// Import middle to handle to validation if json format.
const verifyJson = require('./middlewares/verifyJsonFormat.js');

// Importando o body-parser para pegar os dados da requisição.
const bodyParser = require("body-parser");

// End of importations!
// Initialized app use options!
//app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Add middle to handle validation of json format, before dedicated routes.
app.use(verifyJson);

// Importando o DB para consultar os dados.
const db = require("./config/db");

// Importando as rotas.
const router = require("./routes/Router");
// Resolvendo o problema do CORS, setando frontend confiável.
app.use(cors({ credentias: true, origin: "http://localhost:3000" }));
// Diretório de uplod dos arquivos
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.json());
app.use(router);

// Turn on the server on port 3001

app.listen(PORT_PROJECT, () => {
  console.log(
    "Server is up and running, to acess click here: " +
      `http://localhost:${PORT_PROJECT}`
  );
});
