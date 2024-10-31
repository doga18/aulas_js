const express = require("express");
const router = express.Router();

// Controller
const { register, login, teste, getCurrentUser, updateUser } = require("../controllers/UserController");

// Middleware
const { validate } = require("../middlewares/handleValidation");
const { userCreateValidation, userLoginValidation, userUpdateValidation } = require("../middlewares/userValidation");
const { authGuard } = require("../middlewares/authGuard");

// Rotas do user.
router.post("/register", userCreateValidation(), validate, register)
router.post("/login", userLoginValidation(), validate, login)
router.post("/teste", authGuard, teste)
router.get("/profile", authGuard, getCurrentUser);
router.put("/user", authGuard, userUpdateValidation(), validate, updateUser);

module.exports = router;