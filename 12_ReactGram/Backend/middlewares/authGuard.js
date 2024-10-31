// Middlware para proteger rotas que precisam de autenticação.
const User = require("../models/User");
const jwt = require("jsonwebtoken");
// Iniciando o dotenv
require("dotenv").config();
const jwtsecret = process.env.JWT_SECRET

const authGuard = async (req, res, next) => {
  const authheader = req.headers["authorization"]
  const token = authheader && authheader.split(" ")[1];

  // if check header has a token
  if(!token) return res.status(401).json({errors: ["Acesso negado."]});

  // Protegendo se há mascaramento de Token;
  try {
    // Aqui eu sei que o token existe, então verificamos o token e sua validade.
    const verified = await jwt.verify(token, jwtsecret);
    // Pegando o usuário que já está na requisição.
    // Lembrando de omitir a senha do usuário.
    req.user = await User.findById(verified.id).select("-password");
    //console.log(req.user);
    next();    
  } catch (error) {
    res.status(401).json({errors: ["Token invalido."]});
  }
}

module.exports = { authGuard };