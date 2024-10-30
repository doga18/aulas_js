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
    // body("username")
    //   .isString()
    //   .withMessage("O usuário precisa ser informado."),
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
  ]
}

module.exports = {
  userCreateValidation,
  userLoginValidation
};