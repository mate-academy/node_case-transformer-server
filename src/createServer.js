// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here
const http = require('http');
const { convertToCase } = require('./convertToCase');
const { getValidation } = require('./urlValidation');

function createServer() {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const { errors, originalText, targetCase } = getValidation(req.url);

    if (errors.length) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';

      res.end(JSON.stringify({ errors }));
    } else {
      res.statusCode = 200;
      res.statusMessage = 'OK';

      const {
        originalCase,
        convertedText,
      } = convertToCase(originalText, targetCase);

      const resBody = {
        originalCase,
        targetCase,
        originalText,
        convertedText,
      };

      res.end(JSON.stringify(resBody));
    }
  });

  return server;
}

module.exports = { createServer };
