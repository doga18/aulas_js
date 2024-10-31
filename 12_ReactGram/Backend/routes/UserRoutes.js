const express = require("express");
const router = express.Router();

// Controller
const { register, login, getCurrentUser, updateUser } = require("../controllers/UserController");

// Middleware
const { validate } = require("../middlewares/handleValidation");
const { userCreateValidation, userLoginValidation, userUpdateValidation } = require("../middlewares/userValidation");
const { imageUpload } = require("../middlewares/imageUpload");
const { authGuard } = require("../middlewares/authGuard");

// Rotas do user.
router.post("/register", userCreateValidation(), validate, register)
router.post("/login", userLoginValidation(), validate, login)
router.get("/profile", authGuard, getCurrentUser);
router.put("/user", authGuard, userUpdateValidation(), validate, imageUpload.single("profileImage"), updateUser);
router.get("/:id", authGuard, validate, getCurrentUser);

module.exports = router;