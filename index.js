const fs = require('fs');

function trataErro(erro) {
  throw new Error(erro.code, 'não há arquivo no caminho!');
}

function pegaArquivo(caminhoDoArquivo) {
  const encoding = 'utf-8';
  fs.promises
  .readFile(caminhoDoArquivo, encoding)
  .then((texto) => console.log(texto))
  .catch((erro) => trataErro(erro))
}

// function pegaArquivo(caminhoDoArquivo) {
//   const encoding = 'utf-8';
//   fs.readFile(caminhoDoArquivo, encoding, (erro, texto) => {
//     if(erro) {
//       trataErro(erro);
//     }
//     console.log(texto)
//   })
// }

pegaArquivo('./src/text1.md');