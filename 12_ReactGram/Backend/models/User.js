// Importando o mongoose para criar o model de user.
const mongoose = require("mongoose");
const {Schema} = mongoose;

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String,
    required: false,
  },
  bio: {
    type: String,
    required: false,
  }
},{timestamps: true});

// Exportando para uso o model.
const User = mongoose.model("User", UserSchema);

module.exports = User;