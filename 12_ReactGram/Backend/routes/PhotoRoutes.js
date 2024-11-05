const express = require('express');
const router = express.Router();

// Import's the middleware of control.
  const { validate } = require('../middlewares/handleValidation');  
  const { authGuard } = require('../middlewares/authGuard');
  const { photoValidation } = require('../middlewares/photoValidation');

// Import's the user controller.
// Import's the photos controller.
const { createPhoto, getPhoto, editPhoto, deletePhoto, getPhotos, getUserPhotos } = require('../controllers/PhotoController');
const { imageUpload } = require('../middlewares/imageUpload');

// Routes for photos restfull
router.post('/', authGuard, imageUpload.single('image'), photoValidation(), validate, createPhoto);
router.get('/:id', authGuard, validate, getPhoto);
router.put('/:id', authGuard, validate, editPhoto);
router.delete('/:id', authGuard, validate, deletePhoto);

// For use with the blog
// Get all posts
router.post('/getallphotos', authGuard, validate, getPhotos);
// Get all posts with user has created.
router.get('/getallphotos/:id', authGuard, validate, getUserPhotos )



module.exports = router;

