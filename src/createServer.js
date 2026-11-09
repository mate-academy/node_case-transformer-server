'use strict';

const http = require('http');
const { validateURL } = require('./validateURL.js');
const { convertToCase } = require('./convertToCase/convertToCase.js');

function createServer() {
  const server = http.createServer((req, res) => {
    const normalizedURL = new URL(req.url, `http://${req.headers.host}`);
    const textToConvert = normalizedURL.pathname.slice(1);
    const convertType = normalizedURL.searchParams.get('toCase');

    res.setHeader('Content-type', 'application/json');

    const validateRequest = validateURL(textToConvert, convertType);

    if (validateRequest.errors.length) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      res.end(JSON.stringify(validateRequest));

      return;
    }

    const convertionResult = convertToCase(textToConvert, convertType);

    res.statusCode = 200;
    res.statusMessage = 'OK';

    res.end(
      JSON.stringify({
        originalText: textToConvert,
        targetCase: convertType,
        ...convertionResult,
      }),
    );
  });

  return server;
}

module.exports = { createServer };
