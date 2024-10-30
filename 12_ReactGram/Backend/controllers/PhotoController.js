// Importando o model Photo para criar seu controller.
const Photo = require("../models/Photo");


// Funções de Rest

const createPhoto = async (req, res) => {
  const {userId, userName, title, image} = req.body;

  

};

const getPhoto = async (req, res) => {};

const editPhoto = async (req, res) => {};

const deletePhoto = async (req, res) => {};

module.exports = { createPhoto, getPhoto, editPhoto, deletePhoto }