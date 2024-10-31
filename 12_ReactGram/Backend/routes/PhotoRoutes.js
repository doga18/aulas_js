const express = require('express');
const router = express.Router();

// Import's the middleware of control.
  const { validate } = require('../middlewares/handleValidation');  
  const { authGuard } = require('../middlewares/authGuard');
  const { photoValidation } = require('../middlewares/photoValidation');

// Import's the user controller.
// Import's the photos controller.
const { createPhoto, getPhoto, editPhoto, deletePhoto } = require('../controllers/PhotoController');
const { imageUpload } = require('../middlewares/imageUpload');

// Routes for photos.

router.post('/photos', authGuard, imageUpload.single('image'), photoValidation(), validate, createPhoto);
router.get('/photos/:id', authGuard, validate, getPhoto);
router.put('/photos/:id', authGuard, imageUpload.single('image'), photoValidation(), validate, editPhoto);
router.delete('/photos/:id', authGuard, validate, deletePhoto);

module.exports = router;

