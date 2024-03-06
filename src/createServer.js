/* eslint-disable max-len */
// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here

const http = require('http');
const { detectCase } = require('./convertToCase/detectCase');
const { convertToCase } = require('./convertToCase');
const { validateCase } = require('./validateCase');

function createServer() {
  const server = http.createServer((req, res) => {
    try {
      const normalizedURL = new URL(req.url, `http://${req.headers.host}`);
      const toCase = normalizedURL.searchParams.get('toCase');
      const text = req.url.split('?')[0].slice(1);

      const errors = [];

      if (!text) {
        errors.push('Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".');
      }

      if (!toCase) {
        errors.push('"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".');
      }

      if (toCase && !validateCase(toCase)) {
        errors.push('This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.');
      }

      if (errors.length > 0) {
        throw errors;
      }

      res.writeHead(200, 'OK', { 'Content-Type': 'application/json' });

      const responseData = {
        originalCase: detectCase(text),
        targetCase: toCase,
        originalText: text,
        convertedText: convertToCase(text, toCase).convertedText,
      };

      res.end(JSON.stringify(responseData));
    } catch (errors) {
      res.writeHead(400, 'Bad Request', { 'Content-Type': 'application/json' });

      const errorMessages = {
        errors: errors.map(error => ({
          message: error,
        })),
      };

      res.end(JSON.stringify(errorMessages));
    }
  });

  return server;
}

module.exports = { createServer };
