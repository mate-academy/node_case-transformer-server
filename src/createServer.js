// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here

const { checkError } = require('./errors');
const { convertToCase } = require('./convertToCase');

const http = require('http');

function createServer() {
  const server = http.createServer((req, res) => {
    const params = req.url.split('?');
    const originalText = params[0].slice(1);
    const targetCase = new URLSearchParams(params[1]).get('toCase');

    const errors = checkError(originalText, targetCase);

    res.setHeader('Content-Type', 'application/json');

    if (errors.length !== 0) {
      res.statusCode = 400;

      return res.end(JSON.stringify({ errors }));
    }

    const { originalCase, convertedText } = convertToCase(
      originalText,
      targetCase,
    );

    const result = {
      originalCase,
      targetCase,
      originalText,
      convertedText,
    };

    res.end(JSON.stringify(result));
  });

  return server;
}

module.exports = {
  createServer,
};
