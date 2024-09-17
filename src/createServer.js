const http = require('http');
const { validation } = require('./validation');
const { sendResponse } = require('./sendResponse');
const { splitUrl } = require('./splitUrl');
const { responseData } = require('./responseData');

const createServer = () => {
  const server = http.createServer((req, res) => {
    const { textToConvert, toCase } = splitUrl(req.url);
    const errorsCheck = validation(textToConvert, toCase);
    const hasError = errorsCheck.errors.length > 0;

    res.setHeader('Content-Type', 'application/json');

    if (hasError) {
      sendResponse(res, 404, 'Bad request', errorsCheck);

      return;
    }

    sendResponse(res, 200, 'OK', responseData(textToConvert, toCase));
  });

  return server;
};

module.exports = { createServer };
