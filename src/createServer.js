'use strict';

const http = require('http');
const validateRequest = require('./validateRequest');
const normalizeUserInput = require('./normalizeUrl');
const converter = require('./convertToCase/convertToCase');
const caseName = require('./convertToCase/detectCase');
const PORT = process.env.PORT || 8080;

function createServer() {
  const server = http.createServer((request, response) => {
    const { text, method } = normalizeUserInput(request.url, PORT);
    const validationErrors = validateRequest(text, method);

    response.setHeader('Content-Type', 'application/json');

    if (validationErrors.length) {
      response.statusCode = 400;

      const responseErrors = {
        errors: validationErrors,
      };

      response.end(JSON.stringify(responseErrors));
    } else {
      response.statusCode = 200;

      const convertedText = converter.convertToCase(text, method);

      const result = {
        originalCase: caseName.detectCase(text),
        targetCase: method,
        originalText: text,
        convertedText: convertedText.convertedText,
      };

      response.end(JSON.stringify(result));
    }
  });

  return server;
};

module.exports = { createServer };
