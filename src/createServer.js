const http = require('http');
const { errorValidation } = require('./errorValidation');
const { responseData } = require('./responseData');
const { getURL } = require('./getURL');
const { sendResponse } = require('./sendResponse');

const createServer = () => {
  const server = http.createServer((req, res) => {
    const splitUrl = req.url.split('?');
    const { textToConvert, toCase } = getURL(splitUrl);
    const errorMessage = errorValidation(textToConvert, toCase);
    const hasError = errorMessage.errors.length > 0;

    res.setHeader('Content-Type', 'application/json');

    if (hasError) {
      sendResponse(res, 404, 'Bad request', errorMessage);

      return;
    }

    sendResponse(res, 200, 'OK', responseData(textToConvert, toCase));
  });

  return server;
};

module.exports = { createServer };
