const http = require('http');
const { getValidationErrors } = require('./getValidationErrors');
const { convertToCase } = require('./convertToCase');

function createServer() {
  return http.createServer((req, res) => {
    const normalizedURL = new URL(req.url, `http://${req.headers.host}`);
    const toCase = normalizedURL.searchParams.get('toCase');
    const textToConvert = normalizedURL.pathname.slice(1);

    res.setHeader('Content-Type', 'application/json');

    const validationErrors = getValidationErrors(textToConvert, toCase);

    if (validationErrors.length > 0) {
      res.writeHead(400, 'Bad request');
      res.end(JSON.stringify({ errors: validationErrors }));

      return;
    }

    const serverResponse = {
      ...convertToCase(textToConvert, toCase),
      targetCase: toCase,
      originalText: textToConvert,
    };

    res.end(JSON.stringify(serverResponse));
  });
}

module.exports = { createServer };
