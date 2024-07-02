// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here
const http = require('http');
const { convertToCase } = require('./convertToCase');
const { validateParams } = require('./validation');

function createServer() {
  return http.createServer((req, res) => {
    const currURL = new URL(req.url, `http://${req.headers.host}`);
    const textToConvert = currURL.pathname.slice(1);
    const toCase = currURL.searchParams.get('toCase');

    const errors = validateParams(textToConvert, toCase);

    if (errors.length > 0) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ errors }));

      return;
    }

    const { originalCase, convertedText } = convertToCase(
      textToConvert,
      toCase,
    );

    const normalizedOutput = {
      originalCase: originalCase,
      targetCase: toCase,
      originalText: textToConvert,
      convertedText: convertedText,
    };

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(normalizedOutput));
  });
}

module.exports = { createServer };
