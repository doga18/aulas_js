// Importando o model User para criar seu controller.
const User = require("../models/User");
// Importando o bcrypt para criptografar a senha.
const bcryptjs = require("bcryptjs");
// Importando o jwt para gerar o token.
const jwt = require("jsonwebtoken");
// Importando a chave do JWT do dotenv.
require("dotenv").config();
const secret = process.env.JWT_SECRET;
// Import's the mongoose.
const mongoose = require("mongoose");
// Imortando o js e o path para manipular arquivos quando necessário.
const fs = require("fs");
const path = require("path");

// Gerando o user Token, Após a autenticação é esse token que será criado.
const generateToken = (id) => {  
  return jwt.sign({id}, secret, {expiresIn: "1d"});
}

// Funções gerais
// Função para hashear a senha.
const hashPassword = (password) => {
  const hash = bcryptjs.hash(password, 8);
  return hash;  
}
// Deletar file.
const tryDeleteFile = (file, destination, cb) => {
  const filepath = path.join(__dirname, destination, file);
  console.log(`Tentando deletar o arquivo file: ${filepath}`);
  try {
    // Verify if file exists
    fs.access(filepath, fs.constants.F_OK, (err) => {      
      if (err) {
        cb(err);
      } else {
        fs.unlink(filepath, (err) => {
          if (err) {
            // If exists error, tha error is returned
            cb(err);
          } else {
            // if not error and that file is deleted, tre is returned or null
            cb();
          }
        });
      }
    })
  } catch (error) {
    return cb = false;
  }

  
}

// Primeira função do usuário!
const register = async (req, res) => {
  const {username, email, password} = req.body;  
  //  Verificando se o email ja existe no banco de dados.
  const checkEmail = await User.findOne({email});
  if(checkEmail){    
    return res.status(422).send({errors: ["Email ja existe, tente recuperar sua senha."]});
  } 
  else if(password.length < 6){
    return res.status(422).json({errors: ["Senha muito fraca, a senha precisa seguir os critérios mínimos!"]});
  }else{
    // Processo de criar o usuário.
    try {
      const password_hash = await hashPassword(password);
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
      return res.status(400).json({errors: ["Erro ao criar o usuário, tente novamente mais tarde."]})
    }
  };
};

const login = async (req, res) => {
  const {email, password} = req.body;
  let userTry;
  const UserExists = await User.findOne({email});
  const UserExistsUsername = await User.findOne({username: email})
  if(!UserExists && !UserExistsUsername){
    return res.status(404).json({errors: ["Usuário nao encontrado, tente novamente mais tarde."]});
  }else if(UserExists){
    userTry = UserExists;
  }else if(UserExistsUsername){
    userTry = UserExistsUsername;
  }

  const checkPassword = await bcryptjs.compare(password, userTry.password);
  if(!checkPassword){
    return res.status(400).json({errors: ["Senha invalida, tente novamente ou recupere sua conta."]});
  }
  res.status(200).json({
    _id: userTry._id,
    profileImage: userTry.profileImage,
    token: generateToken(userTry._id)
  })
};

// Get the logged in user.
const getCurrentUser = async (req, res) => {
  try {    
    // Pegando por params    
    const { id } = req.params;    
    const user = await User.find(new mongoose.Types.ObjectId(id)).select('-password');
    if(!user){
      res.status(404).json({errors: ["Acesso não autorizado!"]});
    }
    res.status(200).json({user});
  } catch (error) {
    console.log(error);
    res.status(403).json({errors: ['A página que você procura não existe ou foi removida']})
  }
}

const updateUser = async (req, res) => {
  try {
    // Aqui você pode fazer o update do usuário.
    const reqUser = await req.user;    
    const { username, password, bio } = req.body;    
    // Buscando um usuário pelo ID.
    const selectedUser = await User.findOne(new mongoose.Types.ObjectId(reqUser._id));    
    try {
      if(username){
        selectedUser.username = username;
      }
      if(password){
        const hashedPassword = await hashPassword(password);
        selectedUser.password = hashedPassword;
      }
      if(bio){
        selectedUser.bio = bio;
      }
      if(req.file){
        // Tentando deletar a foto anterior para carregar a nova do usuário.
        const f = await tryDeleteFile(selectedUser.profileImage, "../uploads/users/", (error) => {          
        });
        if(!f){
          console.log("Arquivo atualizado com sucesso");
        }
        selectedUser.profileImage = req.file.filename;
      }      
      await selectedUser.save();
      res.status(200).json({success: "User updated successfully \n " + selectedUser});
    } catch (error) {
      console.log(error);
      res.status(503).json({errors: ['houve um erro ao salvar o usuário, tente novamente.']});
    }
  } catch (error) {
    console.log(error);
    res.status(403).json({errors: ['Não foi possível pegar o usuário da requisição.']});
  }
  
};



// Exportando o controller para uso posterior.

module.exports = { register, login, getCurrentUser, updateUser }