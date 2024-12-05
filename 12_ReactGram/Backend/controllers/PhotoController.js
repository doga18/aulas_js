// Importando o model Photo para criar seu controller.
const Photo = require("../models/Photo");
// Imports model user to collect data.
const User = require("../models/User");
// Mongoose
const mongoose = require("mongoose");
// Para manipulação de arquivos.
const fs = require("fs");
const path = require("path");

const createPhoto = async (req, res) => {
  const { title, description } = req.body;
  //console.log(title, req.file);
  const userId = req.user._id;
  const userName = req.user.username;
  //console.log(userId, userName, title);
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

  try {
    const { id } = req.params;
    const { title, description} = req.body;  
    const reqUser = req.user;
    const photo = await Photo.findById(id);
    //console.log(reqUser._id);
    // Check if the photo exists.
    if(!photo){
      return res.status(422).json({ errors: ['That photo is not exists!']});
    }
    // Check if the photo belongs to the user who is trying to edit it.
    if(!photo.userId.equals(reqUser._id)){
      return res.status(422).json({ errors: ['Are you not authorized to edit this photo!']});
    }
    if(title === photo.title && description === photo.description){
      return res.status(200).json({ errors: ['You trying edit this photo, but that information is exactly equal, try with another informations!']});
    }
    if(title){
      photo.title = title;
    }
    if(description){
      photo.description = description;
    }
    await photo.save();
    return res.status(200).json(photo);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: ['An error occurred while trying to edit the photo!']});
  }

};
const getPhoto = async (req, res) => {
  const { id } = req.params;

    //const tryGetPhoto = await Photo.findById(id).select('-userId');
    const tryGetPhoto = await Photo.findById(id);

    try {
      if(tryGetPhoto === null){
        return res.status(404).json({ errors: ['That photo is not exists!']});
      }
      return res.status(200).json(tryGetPhoto);
    } catch (error) {
      return res.status(500).json({ errors: [error]});
    }
  };
const getPhotos = async (req, res) => {
  // Route to get photos to send in the home page.

  try {    
    const lastPhotos = await Photo.find({}).sort([['createdAt', -1]]).exec();
    return res.status(200).json({ success: true, data: lastPhotos});
  } catch (error) {
    return res.status(500).json({errors: [error]});
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
    return res.status(500).json({errors: [error]});
  }

};
// Search for photos by title
const searchPhoto = async(req, res) => {
  const {q} = req.query;

  const result = await Photo.find({}).where({ title: new RegExp(q, 'i') }).exec();

  console.log(q);
  return res.status(200).json({success: result});
}
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
// Routes to actions on photo!
// Route to register a like on the photo.
const giveLikePhoto = async (req, res) => {
  const { id } = req.params;

  const reqUser = req.user;

  const sPhoto = await Photo.findById(id);

  if(!sPhoto){
    return res.stauts(400).json*{ errors: ["Fail to give like in photo with not exists!"]}
  }

  try {
    // Verify if the user already likes this photo.
    if(sPhoto.likes.includes(reqUser._id)){
      // If the user already likes, then that action will be erased that like.
      await sPhoto.likes.remove(reqUser._id);
      sPhoto.save();
      return res.status(200).json({"success": `Unliked from ID:${reqUser._id} Name:${reqUser.username}!`})
      //return res.status(401).json({ errors: ['User already likes this photo!']})
    }
    
    const tryLike = await sPhoto.likes.push(reqUser._id);
    await sPhoto.save();
    //return res.status(200).json({"success": `Liked from ID:${reqUser._id} Name:${reqUser.username}!`})
    return res.status(200).json(sPhoto);
  } catch (error) {
    console.log(error);
    return res.status(422).json({ errors: ["Error while try to like in that photo."]})
  }
}
// Get all likes from that photo.
const getLikesPhoto = async (req, res) => {
  const { id } = req.params;

  const likesPhoto = await Photo.findById(id);

  if(!likesPhoto){
    return res.status(200).json({ errors: ["Error to get likes from that photo!"]})
  }

  try {
    const listIdLikes = likesPhoto.likes;
    // Consult info about id of users who have liked this photo.

    if(!listIdLikes){
      return res.status(404).json({ errors: ["None likes are found in this photo!"]})
    }

    let listAAA = [];

    const usersLiked = await Promise.all(
      listIdLikes.map(async (user) => {
        const find = await User.findById(user).select('-password');
        listAAA.push(find);
      })
    )

    return res.status(200).json(listAAA)
  } catch (error) {
    console.log(error);
    return res.status(401).json({ errors: [" Error to get likes from that photo!"]})
  }  
}
// Insert a comment in the photo.
const createCommentPhoto = async (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;
  const reqUser = req.user;

  try {
    const cPhoto = await Photo.findById(id);
    const userComment = {
      userId: reqUser._id,
      username: reqUser.username,
      userImage: reqUser.profileImage,
      comment: comment
    }

    if(!cPhoto){
      return res.status(404).json({ errors: ["Your comment have to go in the photo with exists."]})
    }

    const newComment = cPhoto.comments.push(userComment);
    await cPhoto.save();

    return res.status(201).json(userComment);

  } catch (error) {
    return res.status(404).json({ errors: ["Internal error, try again later."]})
  }
}
// Get all comments of that photo.
const getCommentsPhoto = async (req, res) => {
  const { id } = req.params;
  
  try {
    const commentsPhoto = await Photo.findById(id);

    if(!commentsPhoto){
      return res.status(404).json({ errors: ["That's photo dont have any comments"]})
    }
    let comments = [];

    const commentsUsers = await Promise.all(
      commentsPhoto.comments.map(async(comment) => {
        const findUser = await User.findById(comment.id).select('-password');
        comments.push({...comment, user: findUser });
      })      
    )

    return res.status(200).json(comments);

  } catch (error) {    
    return res.status(404).json({ errors: [`Internal error, try again later.`]})
  }

}

module.exports = { 
  createPhoto,
  getPhoto,
  editPhoto,
  deletePhoto,
  getPhotos,
  getUserPhotos,
  giveLikePhoto,
  getLikesPhoto,
  createCommentPhoto,
  getCommentsPhoto,
  searchPhoto
}