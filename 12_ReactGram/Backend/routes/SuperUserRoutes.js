const User = require("../models/User");
const Photo = require("../models/Photo");

const express = require('express');
const router = express.Router();

const KEY_DEVELOPMENT = process.env.KEY_DEVELOPMENT;

// This route only exists to provide a simple way to clean up my collections!
router.get("/", async (req, res) => {
  const {keyInformed, users, photos} = req.body;
  console.log(req.body)

  if (keyInformed === KEY_DEVELOPMENT) {
    if(!users && !photos){
      return res.status(200).json({"success": "Please, set what you want clean! If you want to clean Users, send users: true! If you want to clean Photos, send photos: true!"})
    }
    if(users === true){
      try {
        const tryDelete = await User.deleteMany({});        
        return res.status(200).json({"success": tryDelete})  
      } catch (error) {
        return res.status(404).json({"error": "Fail to cleanup Users!"})  
      }      
    }
    if(photos === true){
      try {
        const tryDelete = await Photo.deleteMany({});
        return res.status(200).json({"success": tryDelete})
      } catch (error) {
        res.status(404).json({"error": "Fail to cleanup Photos!"})
      }
    }
  }
  return res.status(200).json({"success": "Unauthorized"})
});


module.exports = router;