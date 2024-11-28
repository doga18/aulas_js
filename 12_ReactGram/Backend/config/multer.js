// Importando o multer para lidar com requisições multipart/form-data
const multer = require("multer");
const path = require("path");

// Definition of store of the multer

const storage = multer.diskStorage({
  destionation: (req, file, cb) => {
    cb(null, `./uplouds/users`);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  }
});

// Defining the limits for the file size and allowed file types
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb('That file is not supported!')
    }
  }
}).single('profileImage');

export default upload;