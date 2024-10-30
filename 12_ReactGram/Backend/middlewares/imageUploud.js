// Criando o middleware para manipulação de arquivos de imagem.
const multer = require('multer');
const path = require('path');

// Destinação.

const imageStorage = multer.diskStorage({
  destination: function(req, file, cb){
    let folder = ""

    if(req.baseUrl.includes("users")){
      folder = "users";      
    } else if (req.baseUrl.includes("photos")) {
      folder = "photos";      
    } else {
      folder = "default" + math.random()
    }
    // Callback para informações.
    cb(null, `upload/${folder}/`)    
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})

// uuid

const imageUpload = multer({
  storage: imageStorage,
  limits: {
    fileSize: 1024 * 1024 * 5 // 5MB
  },
  fileFilter: (req, file, cb) => {
    if(file.mimetype === "image/jpeg" || file.mimetype === "image/png"){
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Apenas imagens JPG ou PNG são permitidas."));
    }    
  }
})

module.exports = { imageUpload }