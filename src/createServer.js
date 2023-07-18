const http = require('http');
const { convertToCase } = require('./convertToCase');
const { handleError } = require('./handleError');

function createServer() {
  return http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const url = new URL(req.url, `http://${req.headers.host}`);

    const originalText = url.pathname.slice(1);
    const targetCase = url.searchParams.get('toCase');

    const errors = handleError(originalText, targetCase);

    if (errors.length) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';

      res.end(JSON.stringify({ errors }));

      return;
    }

    const convertionResult = convertToCase(originalText, targetCase);

    const { originalCase, convertedText } = convertionResult;

    const result = {
      originalCase,
      targetCase,
      originalText,
      convertedText,
    };

    res.statusCode = 200;
    res.statusMessage = 'OK';
    res.end(JSON.stringify(result));
  });
}

module.exports = { createServer };
