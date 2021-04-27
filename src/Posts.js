const fs = require('fs');
const unzipper = require('unzipper'); 

function Posts(req, res){
    let 
      result,
      arquivo,
      local = `archives/Upload/${req.file.filename}`;
  
    if(req.file.mimetype== 'application/x-zip-compressed'){
  
      const unZips =
        fs
          .createReadStream(local)
          .pipe(unzipper.Extract({ path: 'archives/Temp' }));
        
      result = gerJsonPadrao_Zip('archives/Temp/_chat.txt')
     
    }else{
      result = gerJsonPadrao_Txt(local)
      arquivo = gerArquivo(result)
    }
    console.log(req.file)
    // return res
    //           .json(result)
    //           .send()
    return res
              .json(req.file)
              .send()
  }

  function gerJsonPadrao_Zip(caminho){
    let result = new Array
    let data, horario, contato, status, altStatus, grupo
    const fileBuffer = fs.readFileSync(caminho,'utf-8')
    let lines = fileBuffer.split(/\n/g)
    let arrLines = lines.map((e,i)=>{
      console.log(e.substr(41))
      e.substr(e.indexOf("criou"),5)=='criou'?grupo = e.substr(e.indexOf("#")).substr(1,3):false
  
      data = e.substr(1, 10)
      horario = e.substr(12, 5)
      if((e.substr(e.indexOf("entrou usando"),13)=='entrou usando')||(e.substr(e.indexOf(" saiu"),5)==' saiu')){
        contato=e.substr(23,17).trim()
        altStatus=e.substr(42).trim()
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
  function gerJsonPadrao_Txt(caminho){
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
  
  function gerArquivo(obj) {
    let aux
    let txt = '"GRUPO";"DATA";"HORARIO";"CONTATO";"STATUS"\n';
    let objArqv = new Object();
    objArqv = obj;
    let nomeArq = objArqv[0].grupo
    
    objArqv.forEach((row) => {
      aux = Object.values(row)
      txt += aux.join(';');
      txt += "\n";
    });
    const csvFinal = fs.writeFileSync(`archives/Download/${nomeArq}.txt`,txt);
    return csvFinal;
  
  }
  module.exports = Posts