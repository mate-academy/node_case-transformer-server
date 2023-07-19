const http = require('http');
const { convertToCase } = require('./convertToCase');
const { handleErrors } = require('./handleErrors');

function createServer() {
  const server = http.createServer((req, res) => {
    const normalizedURL = new URL(req.url, `http://${req.headers.host}`);
    const textToConvert = normalizedURL.pathname.slice(1);
    const caseName = normalizedURL.searchParams.get('toCase');

    res.setHeader('Content-Type', 'application/json');

    const errors = handleErrors(textToConvert, caseName);

    if (errors.length) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';

      res.end(JSON.stringify({ errors }));
    } else {
      const conversionResult = convertToCase(textToConvert, caseName);

      conversionResult.targetCase = caseName;
      conversionResult.originalText = textToConvert;

      res.statusCode = 200;
      res.end(JSON.stringify(conversionResult));
    }
  });

  return server;
}

module.exports = { createServer };
