const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

module.exports = {
  dest: path.resolve(__dirname,'..','..','archives','Upload'),
  storage: multer.diskStorage({
    destination: (req, file, cb)=>{
      cb(null, path.resolve(__dirname,'..','..','archives','Upload'));
    },
    filename: (req, file, cb)=>{
      crypto.randomBytes(8, (err,hash)=>{
        if(err)cb(err);
        const fileName = `${hash.toString('hex')}-${file.originalname}`;
        cb(null,fileName);
      })
    },
  }),
  limits:{
    filesize: 2*1024*1024
  },
  fileFilter:(req, file, cb)=>{
    const allowedMimes = [
      'text/plain',
      'application/x-zip-compressed'
    ];
    if(allowedMimes.includes(file.mimetype)){
      cb(null,true);
    }else{
      cb(new Error("Invalid file type."));
    }
  }

};