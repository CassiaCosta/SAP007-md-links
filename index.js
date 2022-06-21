const fs = require("fs");
// const path = require('path');

function extraiLinks(texto) {
  const regex = /\[([^\]]*)\]\((https?:\/\/[^$#\s].[^\s]*)\)/gm;
  const arrayResultados = [];
  let temp;
  while((temp = regex.exec(texto)) !== null) {
    arrayResultados.push({ [temp[1]]: temp[2]})
  }
  return arrayResultados.length === 0 ? 'não há links' : arrayResultados;
}

function trataErro(erro) {
  throw new Error(erro.code, "não há arquivo no caminho!");
}

function pegaArquivo(caminhoDoArquivo) {
  const encoding = "utf-8";
  fs.promises.readFile(caminhoDoArquivo, encoding)
    .then((texto) => {
      console.log(extraiLinks(texto))
    })
    .catch((erro) => trataErro(erro));
}

// const mdLinks = (arquivo) => {
//   const regex = /\[([^\]]*)\]\(https?:\/\/[^$#\s].[^\s]*\)/gm;
//   return new Promise((resolve, reject) => {
//     fs.readFile(arquivo, 'utf8', (erro, texto) => {
//       if (erro) {
//        if(path.extname(arquivo) !== ".md")
//        reject('Formato Inválido')
//         reject(error(erro))
//       } else {
//         const linkExtraido = texto.match(regex)
//         linkExtraido.map((link) => {
//           const arrLink = link.replace('[', '').split('](');
//           const strObject = {
//             text: arrLink[0],
//             link: arrLink[1],
//             arquivo: arquivo,
//           };
//           return resolve(console.log(strObject))
//         })
//       }
//     })
//   })
// }

module.exports = pegaArquivo;
// module.exports = mdLinks