const fs = require('fs');
const routes = require('express').Router();
const multer = require('multer');
const multerConfig = require('./config/multer');
// const caminho = 'archive/teste.txt';
const caminho = 'archive/whats-082.txt';

routes.post("/posts", multer(multerConfig).single('file'), (req, res)=>{
  console.log(req.file);
  return res.json({hello:"world"})
});

routes.get('/listar',(req, res)=>{
let result = new Array
let data, horario, contato, status, altStatus, grupo
  const fileBuffer = fs.readFileSync(caminho,'utf-8')
  let lines = fileBuffer.split(/\n/g)
  let arrLines = lines.map((e,i)=>{
    e.substr(24,5)=='criou'?grupo = e.substr(37).substr(3,3):false

    data = e.substr(0, 10)
    horario = e.substr(11, 5)
    if(e.substr(20,1)=='+'){
      contato=e.substr(21,16).trim()
      altStatus=e.substr(37).trim()
      altStatus.substr(0,6) == 'entrou'?status="entrou":status=altStatus
      result.push({
        "grupo":grupo,
        "data":data,
        "horario":horario,
        "contato":contato,
        "status":status
      })
    }else{
      contato=null
    }

  })
  // console.log(grupo)
  res
    .set({ 'Content-Type': 'text/plain' })
    .send(result);


})



module.exports = routes;


