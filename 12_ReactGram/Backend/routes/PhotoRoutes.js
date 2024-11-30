const express = require('express');
const router = express.Router();

// Import's the middleware of control.
const { validate } = require('../middlewares/handleValidation');  
const { authGuard } = require('../middlewares/authGuard');
const { photoValidation } = require('../middlewares/photoValidation');
const { photoUpdateValidation } = require('../middlewares/photoValidation');
const { commentValidation } = require('../middlewares/photoValidation');

// Import's the user controller.
// Import's the photos controller.
const { 
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
} = require('../controllers/PhotoController');

const { imageUpload } = require('../middlewares/imageUpload');
const { verify } = require('jsonwebtoken');

// Get all posts
router.get('/getallphotos', authGuard, validate, getPhotos);
router.get('/queryphotos', authGuard, validate, searchPhoto);
// Get all posts with user has created.
router.get('/getallphotos/:id', authGuard, validate, getUserPhotos)

// Routes for photos restfull
router.post('/', authGuard, imageUpload.single('image'), photoValidation(), validate, createPhoto);
router.get('/:id', authGuard, validate, getPhoto);
router.put('/:id', authGuard, photoUpdateValidation(), validate, editPhoto);
router.delete('/:id', authGuard, validate, deletePhoto);

// For use with the blog
// Actions like for photos.
router.post('/action/like/:id', authGuard, validate, giveLikePhoto);
router.get('/action/like/:id', authGuard, validate, getLikesPhoto);

// Actions for comments a photos.
router.post('/action/comment/:id', authGuard, commentValidation(), validate, createCommentPhoto);
router.get('/action/comment/:id', authGuard, validate, getCommentsPhoto);



module.exports = router;

