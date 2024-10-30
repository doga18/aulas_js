// Criando um middlaware para validação de dados.

const {validationResult} = require("express-validator");

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if(errors.isEmpty()){
    return next();
  }

  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({msg: err.msg}));  

  return res.status(422).json({
    errors: extractedErrors,
  })
}

module.exports = { validate }