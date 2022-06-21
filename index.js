const fs = require('fs');

function extractLinks(text) {
  const regex = /\[([^\]]*)\]\((https?:\/\/[^$#\s].[^\s]*)\)/gm;
  const resultsArray = [];
  let temp;
  while((temp = regex.exec(text)) !== null) {
    resultsArray.push({ [temp[1]]: temp[2] })
  }
  return resultsArray.length === 0 ? 'não existe links' : resultsArray;
}

function getFile(filePath) {
  const encoding = 'utf-8';
  return fs.promises
  .readFile(filePath, encoding)
  .then((resp) => extractLinks(resp))
  .catch((err) => console.error(err))
}

module.exports = getFile;