// Middleware for validation of file of the model photo.

const { body, param } = require('express-validator');

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

// Create validation for a route of photo updated.

const photoUpdateValidation = () => {
  return [
    body("title")
      .not()
      .equals("undefined")
      .isString()
      .withMessage("O título precisa ser informado, mesmo na atualização.")
      .isLength({ min: 3 })
      .withMessage("O título deve ter pelo menos 3 caracteres"),
    body("description")
      .not()
      .equals("undefined")
      .isString()
      .withMessage("A descrição precisa ser informada, mesmo na atualização.")
      .isLength({ min: 10})
      .withMessage("A descrição precisa ter no mínimo 10 caracteres."),
    param("id")
      .not()
      .equals("undefined")
      .isString()
      .withMessage("O id da foto precisa ser informado.")
      .isLength({ min: 8 })
      .withMessage("O id da foto precisa ter no mínimo 8 caracteres."),
  ]
}

// Validation about comments in the photo.

const commentValidation = () => {
  return [
    param("id")
      .not()
      .equals("undefined")
      .isString()
      .withMessage("O id da foto precisa ser informado.")
      .isLength({ min: 8 })
      .withMessage("O id da foto precisa ter no mús 8 caracteres."),
    body("comment")
      .not()
      .equals("undefined")
      .isString()
      .withMessage("O comentário precisa ser informado.")
      .isLength({min:1})
      .withMessage("O comentário precisa no mínimo ter 1 caractere.")
      .isLength({max: 255})
      .withMessage("O comentário não pode ter mais que 255 caracteres.")
  ]
}

module.exports = {
  photoValidation,
  photoUpdateValidation,
  commentValidation,
};