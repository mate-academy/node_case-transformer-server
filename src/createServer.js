// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here
const http = require('http');
const { validate } = require('./validate.js');
const { convertToCase } = require('./convertToCase/convertToCase.js');

const createServer = () => {
  return http.createServer((req, res) => {
    const normalizedURL = new URL(req.url, `http://${req.headers.host}`);
    const initialText = normalizedURL.pathname.slice(1);
    const toCase = normalizedURL.searchParams.get('toCase');

    const errors = validate(initialText, toCase);

    if (errors.length > 0) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ errors }));

      return;
    }

    const result = convertToCase(initialText, toCase.toUpperCase());
    const { originalCase, convertedText } = result;

    const fullResult = {
      originalCase: originalCase,
      targetCase: toCase,
      originalText: initialText,
      convertedText: convertedText,
    };

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(fullResult));
  });
};

module.exports = {
  createServer,
};
