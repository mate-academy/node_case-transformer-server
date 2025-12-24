const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase.js');
const { validateResponse } = require('./validateResponse.js');

const createServer = () => {
  const server = http.createServer((req, res) => {
    const requestedUrl = req.url.split('?');
    const path = requestedUrl[0];
    const queryString = requestedUrl[1];
    const params = new URLSearchParams(queryString);
    const toCase = params.get('toCase');
    const textToConvert = path.slice(1);

    const errorMessages = validateResponse(textToConvert, toCase);

    res.setHeader('Content-Type', 'application/json');

    if (errorMessages.errors.length) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';

      return res.end(JSON.stringify(errorMessages));
    }

    res.statusCode = 200;

    const convertedData = convertToCase(textToConvert, toCase);

    const response = {
      originalCase: convertedData.originalCase,
      targetCase: toCase.toUpperCase(),
      originalText: textToConvert,
      convertedText: convertedData.convertedText,
    };

    return res.end(JSON.stringify(response));
  });

  return server;
};

module.exports = { createServer };
