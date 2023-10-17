const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase.js');
const { validateRequest } = require('./validateRequest.js');
const { HTTP_BAD_REQUEST, HTTP_OK } = require('./constants.js');

function createServer() {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const normalizedUrl = new URL(req.url, `http://${req.headers.host}`);

    const textToConvert = normalizedUrl.pathname.slice(1);
    const targetCase = normalizedUrl.searchParams.get('toCase');

    const validationErrors = validateRequest(textToConvert, targetCase);

    if (validationErrors.length) {
      res.statusCode = HTTP_BAD_REQUEST;
      res.end(JSON.stringify({ errors: validationErrors }));

      return;
    }

    const {
      originalCase,
      convertedText,
    } = convertToCase(textToConvert, targetCase);

    const response = {
      originalCase,
      targetCase,
      originalText: textToConvert,
      convertedText,
    };

    res.statusCode = HTTP_OK;

    res.end(JSON.stringify(response));
  });

  return server;
}

module.exports = { createServer };
