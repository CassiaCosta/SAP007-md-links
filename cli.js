const getFile = require('./index');
const validateURLs = require('./http-validation');

const way = process.argv;

function processText(filePath) {
  getFile(filePath[2]).then((resp) => {
    if (way[3] === 'validate') {
      validateURLs(resp).then((res) => {
        console.log('validated links', res)
      })
    } else {
      console.log('links list', resp);
    }
  });
}

processText(way);