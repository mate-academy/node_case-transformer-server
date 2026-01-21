
// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here

const http = require('http');
const { detectCase } = require('./convertToCase/detectCase');
const { convertToCase } = require('./convertToCase');
const { getErrors } = require('./getErrors');

function createServer() {
  const server = http.createServer((req, res) => {
    const normalizedURL = new URL(req.url, `http://${req.headers.host}`);
    const toCase = normalizedURL.searchParams.get('toCase');
    const text = req.url.split('?')[0].slice(1);

    try {
      const errors = getErrors(text, toCase);

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
