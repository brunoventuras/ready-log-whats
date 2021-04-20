const fs = require('fs');
const routes = require('express').Router();
const multer = require('multer');
const multerConfig = require('./config/multer');

routes.post("/posts", multer(multerConfig).single('file'), (req, res)=>{
  let local = 'archive/'+req.file.filename;
  let result = getListar(local)
  let arquivo = getArquivo(result)
  
  return res
            .json(result)
            .download('Download/arquivo.txt')
            .send(req.file)
});

function getListar(caminho){
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
  return result;
}

function getArquivo(obj) {
  let hiddenElement,aux
  let txt = '"GRUPO";"DATA";"HORARIO";"CONTATO";"STATUS"\n';
  let objArqv = new Object();
  // objArqv = JSON.parse(obj);
  objArqv = obj;
  
  objArqv.forEach((row) => {
    aux = Object.values(row)
    txt += aux.join(';');
    txt += "\n";
  });
  console.log(txt)
  const csvFinal = fs.writeFileSync('Download/arquivo.txt',txt);
  return csvFinal;
  // hiddenElement = document.createElement('a');
  // hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(txt);
  // hiddenElement.target = '_blank';
  // hiddenElement.download = objArqv.grupo + '.txt';
  // hiddenElement.click();
}


       
       


module.exports = routes;


