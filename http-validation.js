const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

function handleError(err) {
  throw new Error(err.message);
}

function checkStatus(arrayURLs) {
  return Promise.all(
    arrayURLs.map((url) => {
      return fetch(url)
        .then((response) => `${response.status} - ${response.statusText}`)
        .catch((err) => handleError(err));
    })
  )
    .then((statusArray) => statusArray)
    .catch((err) => handleError(err));
}

function generateArrayURLs(arrayLinks) {
  return arrayLinks.map((objctLink) => Object.values(objctLink).join());
}

function validateURLs(arrayLinks) {
  const link = generateArrayURLs(arrayLinks);
  return checkStatus(link)
    .then((res) => {
      return arrayLinks.map((object, index) => ({
        //spread operator
        ...object,
        status: res[index],
      }));
    })
    .catch((err) => console.error(err));
}

module.exports = validateURLs;
