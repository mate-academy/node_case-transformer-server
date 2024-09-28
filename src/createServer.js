const { convertToCase } = require('./convertToCase/index');
const { validateParameters } = require('./validateRequest');
const http = require('http');

function createServer() {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const normalizedURL = new URL(req.url, `http://${req.headers.host}`);
    const originalText = normalizedURL.pathname.substring(1);
    const queryParams = new URLSearchParams(normalizedURL.search);
    const targetCase = queryParams.get('toCase');

    const paramsErrors = validateParameters(originalText, targetCase);

    if (paramsErrors.length) {
      res.statusCode = 400;
      res.statusMessage = 'Bad Request';
      res.end(JSON.stringify({ errors: paramsErrors }));

      return;
    }

    const { originalCase, convertedText } = convertToCase(
      originalText, targetCase,
    );

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

  return server;
}

createServer();

module.exports = { createServer };
