const http = require('http');
const { convertToCase } = require('./convertToCase');
const { hasError } = require('./hasError');

function createServer() {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const normaluzedURL = new URL(req.url, 'http:localhost:5700');
    const targetCase = normaluzedURL.searchParams.get('toCase');
    const originalText = normaluzedURL.pathname.slice(1);

    const errors = hasError(originalText, targetCase);

    if (errors) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';

      res.end(JSON.stringify(errors));

      return;
    }

    const { originalCase, convertedText }
      = convertToCase(originalText, targetCase);

    if (!errors) {
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
