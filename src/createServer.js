/* eslint-disable max-len */
/* eslint-disable no-console */
const http = require('http');
const { convertToCase } = require('./convertToCase');
const { detectErrors } = require('./detectErrors');

function createServer() {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const normalize = new URL(req.url, 'http:localhost:5700');
    const originalText = normalize.pathname.slice(1) || '';
    const targetCase = normalize.searchParams.get('toCase') || '';

    const errors = detectErrors(originalText, targetCase);

    console.log(errors);

    if (errors) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';

      res.end(JSON.stringify({ errors }));
    }

    if (!errors) {
      const { originalCase, convertedText } = convertToCase(originalText, targetCase);

      res.statusCode = 200;
      res.statusMessage = 'OK';

      res.end(JSON.stringify({
        originalCase,
        targetCase,
        originalText,
        convertedText,
      }));
    }
  });

  return server;
};

module.exports = { createServer };
