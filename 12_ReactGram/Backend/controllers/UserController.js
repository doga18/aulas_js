// Importando o model User para criar seu controller.
const User = require("../models/User");
// Importando o bcrypt para criptografar a senha.
const bcryptjs = require("bcryptjs");
// Importando o jwt para gerar o token.
const jwt = require("jsonwebtoken");
// Importando a chave do JWT do dotenv.
require("dotenv").config();
const secret = process.env.JWT_SECRET;

// Gerando o user Token, Após a autenticação é esse token que será criado.
const generateToken = (id) => {  
  return jwt.sign({id}, secret, {expiresIn: "1d"});
}

// Primeira função do usuário!

const register = async (req, res) => {
  const {username, email, password} = req.body;  
  //  Verificando se o email ja existe no banco de dados.
  const checkEmail = await User.findOne({email});
  if(checkEmail){    
    return res.status(400).send({erros: ["Email ja existe, tente recuperar sua senha."]});
  } 
  else if(password.length < 6){
    return res.status(400).json({erros: ["Senha muito fraca, a senha precisa seguir os critérios mínimos!"]});
  }else{
    // Processo de criar o usuário.
    try {
      const password_hash = await bcryptjs.hash(password, 8);
      console.log(`Senha Hasheada, ${password_hash}, username e email: ${username}, ${email}`)
      const newUser = await User.create({username, email, password: password_hash});
      // Criando o Token do usuário criado para logar no sistema.
      res.status(201).json({
        _id: newUser._id,
        token: generateToken(newUser._id)
      })
      
    } catch (error) {
      console.log(error)
      console.error(error.message)      
      return res.status(400).json({erros: ["Erro ao criar o usuário, tente novamente mais tarde."]})
    }
  };
};

const login = async (req, res) => {
  const {email, password} = req.body;
  const checkEmail = await User.findOne({email});
  if(!checkEmail){
    return res.status(400).json({erros: ["Usuário nao encontrado, tente novamente mais tarde."]});
  }
  const checkPassword = await bcryptjs.compare(password, checkEmail.password);
  if(!checkPassword){
    return res.status(400).json({erros: ["Senha invalida, tente novamente mais tarde."]});
  }
  res.status(200).json({
    _id: checkEmail._id,
    token: generateToken(checkEmail._id)
  })
};




// Exportando o controller para uso posterior.

module.exports = { register, login }