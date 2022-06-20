const fs = require("fs");

const texto = "## 1. Prefácio [Markdown](https://pt.wikipedia.org/wiki/Markdown) é uma linguagem de marcação muito popular entre os programadores. É usada em muitas plataformas que manipulam texto (GitHub, fórum, blogs e etc) e é muito comum encontrar arquivos com este formato em qualquer repositório (começando pelo tradicional `README.md`). Os arquivos `Markdown` normalmente contém _links_ que podem estar quebrados, ou que já não são válidos, prejudicando muito o valor da informação que está ali. Uma comunidade open source nos propôs criar uma ferramenta, usando [Node.js](https://nodejs.org/), que leia e analise arquivos no formato `Markdown`, para verificar os arquivos que contenham links e mostrar algumas estatísticas. ![md-links](https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg)";

function extraiLinks(texto) {
  const regex = /\[([^\]]*)\]\((https?:\/\/[^$#\s].[^\s]*)\)/gm;
  const arrayResultados = [];
  let temp;
  while((temp = regex.exec(texto)) !== null) {
    arrayResultados.push({ [temp[1]]: temp[2]})
  }
  return arrayResultados;
}

function trataErro(erro) {
  throw new Error(erro.code, "não há arquivo no caminho!");
}

function pegaArquivo(caminhoDoArquivo) {
  const encoding = "utf-8";
  fs.promises
    .readFile(caminhoDoArquivo, encoding)
    .then((texto) => console.log(extraiLinks(texto)))
    .catch((erro) => trataErro(erro));
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

pegaArquivo("./src/text1.md");
