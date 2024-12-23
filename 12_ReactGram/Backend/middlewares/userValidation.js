const { body } = require("express-validator");

const userCreateValidation = () => {
  return [
    body("username")
      .isString()
      .withMessage("O nome é obrigatório")
      .isLength({ min: 3 })
      .withMessage("O nome deve ter pelo menos 3 caracteres"),
    body("email")
      .isString()
      .withMessage("O email é obrigatório")
      .isEmail()
      .withMessage("Insira um email valido"),
    body("password")      
      .isString()
      .withMessage("A senha é obrigatória")
      .isLength({ min: 6 })
      .withMessage("A senha deve ter pelo menos 6 caracteres"),
    body("confirmPassword")
      .isString()
      .withMessage("A confirmação de senha é obrigatória")
      .custom((value, {req}) => {
        if(value !== req.body.password) {
          throw new Error("As senhas nao conferem");
        }
        return true;
      })

    ]
}

const userLoginValidation = () => {
  return [
    body("username")
      .optional()
      .isString()
      .withMessage("O usuário precisa ser informado."),
    body("email")
      .optional()
      .isString()
      .withMessage("O email é obrigatório"),
      // Não precisa essa validação uma vez que o usuário pode informar o username ou o email.
      // .isEmail()
      // .withMessage("Insira um email valido"),
    body("password")
      .isString()
      .withMessage("A senha é obrigatória")
      .isLength({ min: 6 })
      .withMessage("A senha deve ter pelo menos 6 caracteres"),
    body()
      .custom((value) => {
        if(!value.email && !value.username){
          throw new Error("É necessário informar o email ou o username, para realizar a tentativa de login.");          
        }
        return true;
      })
      .withMessage(`É necessário informar o email, username.`)
  ]
}

const userUpdateValidation = () => {
  return [
    body("username")
      .optional()
      .isLength({ min: 3 })
      .withMessage("O nome deve ter pelo menos 3 caracteres"),
    body("email")
      .optional()
      .isEmail()
      .withMessage("Insira um email valido"),
    body("password")
      .optional()
      .isLength({ min: 6 })
      .withMessage("A senha precisa ter no mínimo 6 caracteres."),
    body("confirmPassword")
      .optional()
      .isLength({ min: 6 })
      .withMessage("A confirmação de senha precisa ter no mínimo 6 caracteres."),
    body()
      .custom((value, {req}) => {
        if(value.password !== value.confirmPassword){
          throw new Error("As senhas não conferem.");
        }
      return true;
    })
  ]
}

module.exports = {
  userCreateValidation,
  userLoginValidation,
  userUpdateValidation
};