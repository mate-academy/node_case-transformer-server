const http = require('http');
const { convertToCase } = require('./convertToCase');
const { errorCheck } = require('./errorCheck');

function createServer() {
  const server = http.createServer((req, res) => {
    const normalizeURL = new URL(req.url, `http://${req.headers.host}`);

    const originalText = normalizeURL.pathname.slice(1);
    const targetCase = normalizeURL.searchParams.get('toCase');

    res.setHeader('Content-Type', 'application/json');

    const errorPayload = errorCheck(originalText, targetCase);

    if (errorPayload.errors.length > 0) {
      res.statusCode = 400;
      res.statusMessage = 'Bad Request';

      const jsonString = JSON.stringify(errorPayload);

      res.end(jsonString);
    } else {
      const { originalCase, convertedText } = convertToCase(
        originalText,
        targetCase,
      );

      res.end(JSON.stringify({
        targetCase,
        originalText,
        originalCase,
        convertedText,
      }));
    };
  });

  return server;
}

module.exports = { createServer };
