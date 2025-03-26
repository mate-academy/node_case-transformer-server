// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here

const http = require('http');
const { validation } = require('./convertToCase/validation');
const { convertToCase } = require('./convertToCase/convertToCase');

function createServer() {
  const server = http.createServer((req, res) => {
    const requestArray = req.url.split('?');

    const originalText = requestArray[0].slice(1);
    const params = new URLSearchParams(requestArray[1]);
    const toCase = params.get('toCase');

    const errors = validation(originalText, toCase);
    const successResponse = {};

    if (errors.length) {
      res.writeHead(400, { 'Content-Type': 'application/json' });

      return res.end(JSON.stringify({ errors: errors }));
    } else {
      const conversionResult = convertToCase(originalText, toCase);

      successResponse['originalCase'] = conversionResult.originalCase;
      successResponse['targetCase'] = toCase;
      successResponse['originalText'] = originalText;
      successResponse['convertedText'] = conversionResult.convertedText;

      res.writeHead(200, { 'Content-Type': 'application/json' });

      return res.end(JSON.stringify(successResponse));
    }
  });

  return server;
}

module.exports = { createServer };
