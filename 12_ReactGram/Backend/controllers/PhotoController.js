// Importando o model Photo para criar seu controller.
const Photo = require("../models/Photo");
// Mongoose
const mongoose = require("mongoose");

const createPhoto = async (req, res) => {
  const { title } = req.body;  
  console.log(title, req.file);
  const userId = req.user._id;
  const userName = req.user.username;
  console.log(userId, userName, title);
  
  const newPhoto = await Photo.create({
    title: title,
    image: req.file.path,
    userId: userId,
    userName: userName,
    likes: [],
    comments: [],
  })

  res.status(201).json({"success": newPhoto});
};

const getPhoto = async (req, res) => {
  const { id } = req.params;

    const tryGetPhoto = await Photo.findById(id).select('-userId');

    try {
      res.status(200).json({"success": tryGetPhoto});
    } catch (error) {
      res.status(500).json({"error": error});
    }
  };



const editPhoto = async (req, res) => {};

const deletePhoto = async (req, res) => {};

module.exports = { createPhoto, getPhoto, editPhoto, deletePhoto }