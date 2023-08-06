/* eslint-disable max-len */
const http = require('http');
const { convertToCase } = require('./convertToCase');
const { isError } = require('./isError');

function createServer() {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const normalizedURL = new URL(req.url, `http://localhost${req.headers.host}`);

    const originalText = normalizedURL.pathname.slice(1);
    const targetCase = normalizedURL.searchParams.get('toCase');
    const errors = isError(originalText, targetCase);

    if (errors) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      res.end(JSON.stringify(errors));

      return;
    };

    const { originalCase, convertedText } = convertToCase(originalText, targetCase);
    const data = {
      originalCase,
      convertedText,
      targetCase,
      originalText,
    };

    res.statusCode = 200;
    res.statusMessage = 'OK';
    res.end(JSON.stringify(data));
  });

  return server;
};

module.exports = { createServer };
