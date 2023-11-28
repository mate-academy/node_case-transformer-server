'use strict';

const http = require('http');
const normalizeURL = require('./normalizeURL');
const validation = require('./validation');
const { convertToCase } = require('./convertToCase/convertToCase');

const PORT = process.env.PORT || 8080;

function createServer() {
  const server = http.createServer((req, res) => {
    const { text, param } = normalizeURL(req.url, PORT);
    const errors = validation(text, param);

    res.setHeader('Content-Type', 'application/json');

    if (errors.length) {
      res.statusCode = 400;

      const errorMessages = {
        errors: errors.map(error => ({ message: error })),
      };

      res.end(JSON.stringify(errorMessages));
    } else {
      res.statusCode = 200;

      const { originalCase, convertedText } = convertToCase(text, param);

      const responseMessage = {
        originalCase,
        targetCase: param,
        originalText: text,
        convertedText,
      };

      res.end(JSON.stringify(responseMessage));
    }
  });

  return server;
}

module.exports = { createServer };
