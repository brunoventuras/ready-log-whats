
const routes = require('express').Router();
const multer = require('multer');
const multerConfig = require('./config/multer');
const Posts = require('./Posts');


routes.post("/posts", multer(multerConfig).single('file'),Posts);
routes.get("/teste", (req, res)=>{
  return  res
      .json({teste:"Bruno"})
      .send()
});


module.exports = routes;


