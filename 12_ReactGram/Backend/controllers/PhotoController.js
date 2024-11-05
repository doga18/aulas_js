// Importando o model Photo para criar seu controller.
const Photo = require("../models/Photo");
// Mongoose
const mongoose = require("mongoose");
// Para manipulação de arquivos.
const fs = require("fs");
const path = require("path");

const createPhoto = async (req, res) => {
  const { title, description } = req.body;
  console.log(title, req.file);
  const userId = req.user._id;
  const userName = req.user.username;
  console.log(userId, userName, title);
  // Daria para pegar a photo direto aqui da seguinte forma, nome do arquivo
  // const image = req.file.filename;
  // console.log(image);
  // console.log(req.file);

  const newPhoto = await Photo.create({
    title: title,
    image: req.file.path,
    description: description,
    userId: userId,
    userName: userName,
    likes: [],
    comments: [],
  })

  if(!newPhoto){
    return res.status(400).send({
      errors: ['Photo not created, try again later.']
    })
  }

  res.status(201).json({"success": newPhoto});
};

const editPhoto = async (req, res) => {
  const { id } = req.params;
  const { title, description} = req.body;
  console.log(req.body);
  const reqUser = req.user;
  const photo = await Photo.findById(id);

  console.log(reqUser._id);
  console.log(photo.userId);

  // Check if the photo exists.
  if(!photo){
    return res.status(422).json({ errors: ['That photo is not exists!']});
  }

  // Check if the photo belongs to the user who is trying to edit it.
  if(!photo.userId.equals(reqUser._id)){
    return res.status(422).json({ errors: ['You are not authorized to edit this photo!']});
  }

  if(title === photo.title && description === photo.description){
    return res.status(200).json({ errors: ['You trying edit this photo, but that information is exactly equal.']})
  }

  if(title){
    photo.title = title;
  }

  if(description){
    photo.description = description;
  }

  try {
    let ko = await photo.save();
    console.log(`Valor atual ${photo.description} novo valor enviado ${description}`);
    console.log(ko);
    return res.status(200).json({ 'success': 'Photo saved successfully!'});

  } catch (error) {
    return res.status(500).json({ errors: 'An error occurred while trying to edit the photo!'});
  }

};


const getPhoto = async (req, res) => {
  const { id } = req.params;

    const tryGetPhoto = await Photo.findById(id).select('-userId');

    try {
      if(tryGetPhoto === null){
        return res.status(404).json({ errors: ['That photo is not exists!']});
      }
      return res.status(200).json({"success": tryGetPhoto});
    } catch (error) {
      return res.status(500).json({"error": error});
    }
  };

const getPhotos = async (req, res) => {
  // Route to get photos to send in the home page.

  try {
    //const lastPhotos = await Photo.find().sort({ createdAt: -1 }).limit(20);
    // const k = await Photo.find({});
    // k.map((photo) => console.log(`item: ${photo}`));
    // Query de consulta.
    const lastPhotos = await Photo.find({}).sort([['createdAt', -1]]).exec();
    return res.status(200).json({ success: true, data: lastPhotos});
  } catch (error) {
    return res.status(500).json({"error": error});
  }
  return res.status(200).json({"success": 'sem pesquisa.'});
};

// Get all photos from that user id.
const getUserPhotos = async (req, res) => {
  const { id } = req.params;  

  const tryGetPhotos = await Photo.find({userId: id})    
    .sort([['createdAt', -1]])
    .exec()

  try {
    if(tryGetPhotos === null){
      return res.status(404).json({ errors: ['That photo is not exists!']});
    }
    return res.status(200).json(tryGetPhotos);
  } catch (error) {
    return res.status(500).json({"error": error});
  }

};

const deletePhoto = async (req, res) => {
  // function to delete a photo thas the user is owns.
  const { id } = req.params;

  const reqUser = req.user;

  // Tentando localizar a foto para deletar.

  try {
    // Addres base of the directory about photos stored.
    const base = path.join(__dirname, "..");
    const photoDelete = await Photo.findById(id);

    // Limpando a collection!
    // const limpando = await Photo.deleteMany();

    if(!photoDelete){
      return res.status(400).json({ errors: ['That photo is not exists to be deleted!']});
    }

    // if that photo exists, verify if that photo is owned by the user, to be deleted.

    if(!photoDelete.userId.equals(reqUser._id)){
      return res.status(401).json({ errors: ['That solitation of deleted, only can be owned user.']})
    }

    // Try to delete the physical photo.
    const targetDelete = path.join(base, photoDelete.image);
    fs.rm(targetDelete, (err) => {
      if (err) return res.status(200).json({ errors: ['Error while tryng deleting photo!']});
    })

    // If not valid, none of the conditions are met yet, so just delete the photo and delete the registration in database.
    const deltry = await Photo.findByIdAndDelete(photoDelete._id);
    if(!deltry){
      return res.status(400).json({ errors: ['Error while tryng deleting photo!']});
    }

    res.status(200).json({"success": "Photo deleted."});

  } catch (error) {
    console.error(error);
    res.status(400).json({ errors: ['Error while tryng deleting photo!']});
    return;
  }
};

module.exports = { createPhoto, getPhoto, editPhoto, deletePhoto, getPhotos, getUserPhotos }