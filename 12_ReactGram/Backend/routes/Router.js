const express = require("express");
const router = express();
// Importando o DB para consultar os dados.
const db = require("../config/db.js");
// Importando o controoler do User para uso na rota.
// const userController = require("../controllers/UserController");

// Importando as rotas do usuário.
router.use("/api/user", require("./UserRoutes"));
// Importando as rotas das Photos
router.use("/api/photos", require("./PhotoRoutes"));

// Criando a rota /.
router.get("/", (req, res) => {
  res.send("Api Working!");
});

// Criando as rotas posts, a primeira para teste.
router.post("/teste1", async (req, res) => {
  try {
    const connection = db.conn();
    if (connection) {
      msg = "Conectado ao banco de dados com sucesso!";
    } else {
      msg = "Falha ao conectar ao banco de dados!";
    }
    res.status(200).send({
      status: msg,
    });
  } catch (error) {
    res.status(405).send({
      status: "Falha ao realizar a requisição, tente novamente mais tarde!",
    });
  }
});

module.exports = router;
