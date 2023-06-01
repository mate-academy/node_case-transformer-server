const http = require('http');
const { validation } = require('./validation');
const { sendResponse } = require('./sendResponse');
const { splitUrl } = require('./splitUrl');

const createServer = () => {
  const server = http.createServer((req, res) => {
    const { textToConvert, toCase } = splitUrl(req.url);
    const errorsCheck = validation(textToConvert, toCase);
    const hasError = errorsCheck.errors.length > 0;

    res.setHeader('Content-Type', 'application/json');

    if (hasError) {
      res.statusCode = 400;
      res.statusMessage = 'Bad Request';
    } else {
      res.statusCode = 200;
      res.statusMessage = 'OK';
    }
    sendResponse(errorsCheck, textToConvert, toCase, res);
  });

  return server;
};

module.exports = { createServer };
