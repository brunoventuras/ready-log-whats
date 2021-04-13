const fs = require('fs');
const express = require('express');
const routes = express.Router();
// const caminho = 'archive/teste.txt';
const caminho = 'archive/whats-082.txt';

routes.get('/listar',(req, res)=>{

  const fileBuffer = fs.readFileSync(caminho,'utf-8')
  let data = fileBuffer.split(/\n/g)
  console.log(data)
  res
    .set({ 'Content-Type': 'text/plain' })
    .send(data);


})



module.exports = routes;


