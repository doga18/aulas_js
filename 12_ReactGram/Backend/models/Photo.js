// Importando o mongoose e o Schema para criar o model de photo.
const mongoose = require("mongoose");
const {Schema} = mongoose;

const PhotoSchema = new mongoose.Schema({  
  image: {
    type: String,
    required: true
  },
  likes: {
    type: Array,
    required: false
  },
  description:{
    type: String,
    required: false,
    default: ""
  },
  comments: {
    type: Array,
    required: false
  },
  userId: mongoose.Types.ObjectId,
  userName: {
    type: String,
    required: false
  },
  title: {
    type: String,
    required: true,
  },  
},
  { timestamps: true }
);

const Photo = mongoose.model("Photo", PhotoSchema);

module.exports = Photo;