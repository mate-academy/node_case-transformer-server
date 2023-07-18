const { convertToCase } = require('./convertToCase/index');
const { validateRequest } = require('./validateRequest');
const http = require('http');

function createServer() {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const normalizedURL = new URL(req.url, `http://${req.headers.host}`);
    const originalText = normalizedURL.pathname.substring(1);
    const queryParams = new URLSearchParams(normalizedURL.search);
    const targetCase = queryParams.get('toCase');

    const validationErrors = validateRequest(originalText, targetCase);

    if (validationErrors.length) {
      res.statusCode = 400;
      res.write(JSON.stringify({ errors: validationErrors }));
      res.end();

      return;
    }

    res.statusCode = 200;

    const { originalCase, convertedText } = convertToCase(
      originalText, targetCase,
    );

    const result = {
      originalCase,
      targetCase,
      originalText,
      convertedText,
    };

    res.write(JSON.stringify(result));
    res.end();
  });

  return server;
}

createServer();

module.exports = { createServer };
