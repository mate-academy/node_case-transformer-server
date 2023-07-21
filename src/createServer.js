// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here
const http = require('http');
const { handleError } = require('./helpers');
const { convertToCase } = require('./convertToCase/convertToCase');

const createServer = () => (
  http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const normalizedURL = new URL(req.url, `http://${req.headers.host}`);
    const originalText = normalizedURL.pathname.slice(1);
    const targetCase = normalizedURL.searchParams.get('toCase');

    const errors = handleError(originalText, targetCase);

    if (errors.length) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';

      res.end(JSON.stringify({ errors }));

      return;
    };

    const {
      originalCase,
      convertedText,
    } = convertToCase(originalText, targetCase);

    res.statusCode = 200;
    res.statusMessage = 'Ok';

    res.end(JSON.stringify({
      originalCase,
      targetCase,
      originalText,
      convertedText,
    }));
  }));

module.exports = { createServer };
