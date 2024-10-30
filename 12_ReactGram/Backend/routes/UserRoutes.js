const express = require("express");
const router = express.Router();

// Controller
const { register, login } = require("../controllers/UserController");

// Middleware
const { validate } = require("../middlewares/handleValidation");
const { userCreateValidation } = require("../middlewares/userValidation");
const { userLoginValidation } = require('../middlewares/userValidation');

// Rotas do user.
router.post("/register", userCreateValidation(), validate, register)
router.post("/login", userLoginValidation(), validate, login)

module.exports = router;