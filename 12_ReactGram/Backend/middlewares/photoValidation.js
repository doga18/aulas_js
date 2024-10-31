// Middleware for validation of file of the model photo.

const { body } = require('express-validator');

const photoValidation = () => {
  return [
    body("title")
      // Esse note abaixo, significa, Se o valor NÃO FOR igual (equals) à undefined.
      // Negates the result of the next validation in the chain of validations.
      .not()
      .equals("undefined")
      .withMessage("O título é obrigatório")
      .isString()
      .withMessage("O título é obrigatório")
      .isLength({ min: 3 })
      .withMessage("O título deve ter pelo menos 3 caracteres"),
    body("description")
      .not()
      .equals("undefined")
      .withMessage("A descrição é obrigatória")
      .isString()
      .withMessage("A descrição é obrigatória")
      .isLength({ min: 3 })
      .withMessage("A descrição deve ter pelo menos 3 caracteres"),
    body("image").custom((value, {req}) => {
      // Se não existir um arquivo na requisção, retornará um erro.
      // Se existir, ou seja cair fora do if, retornará true.
      if(!req.file){
        throw new Error("Um arquivo de imagem precisa ser enviado.");
      }
      return true;
    })
  ]
}

module.exports = { photoValidation };