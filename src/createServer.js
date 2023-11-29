/* eslint-disable max-len */
const validateRequest = require('./validateRequest.js');

const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase.js');

const HTTP_OK = 200;
const HTTP_BAD_REQUEST = 400;
const validCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function createServer() {
  const server = http.createServer((req, res) => {
    const urlParts = req.url.split('?');

    const { errors, textToConvert, toCase } = validateRequest(urlParts, validCases);

    if (errors.length) {
      res.writeHead(HTTP_BAD_REQUEST, { 'Content-Type': 'application/json' });

      res.end(JSON
        .stringify({ errors }));
    } else {
      const convert = convertToCase(textToConvert, toCase);

      res.writeHead(HTTP_OK, { 'Content-Type': 'application/json' });

      res.end(JSON.stringify({
        originalCase: convert.originalCase,
        targetCase: toCase,
        originalText: textToConvert,
        convertedText: convert.convertedText,
      }));
    }
  });

  return server;
}

module.exports = { createServer };
