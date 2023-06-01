const http = require('http');
const { errorValidation } = require('./errorValidation');
const { responce } = require('./responce');
const { getURL } = require('./getURL');

const createServer = () => {
  const server = http.createServer((req, res) => {
    const splitUrl = req.url.split('?');
    const { textToConvert, toCase } = getURL(splitUrl);
    const checkError = errorValidation(textToConvert, toCase);
    const hasError = checkError.errors.length > 0;

    res.setHeader('Content-Type', 'application/json');

    if (hasError) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      res.end(JSON.stringify(checkError));

      return;
    }

    res.statusCode = 200;
    res.statusMessage = 'OK';

    res.end(JSON.stringify(responce(textToConvert, toCase)));
  });

  return server;
};

module.exports = { createServer };
