const http = require('http');
const { convertToCase } = require('../src/convertToCase/convertToCase.js');
const { errorTypes } = require('./errorTypes.js');
const { checkForErrors } = require('./checkForErrors.js');

function createServer() {
  return http.createServer((req, res) => {
    const normalizedUrl = new URL(req.url, `http://${req.headers.host}`);
    const toCase = normalizedUrl.searchParams.get('toCase');
    const textToConvert = normalizedUrl.pathname.slice(1);

    const errors = checkForErrors(toCase, textToConvert);

    if (errors.length > 0) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ errors }));

      return;
    }

    const { originalCase, convertedText } = convertToCase(
      textToConvert,
      toCase,
    );

    const response = {
      originalCase,
      targetCase: toCase,
      originalText: textToConvert,
      convertedText,
    };

    if (originalCase && convertedText) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(response));
    } else {
      res.writeHead(500, { 'Content-Type': 'application/json' });

      res.end(
        JSON.stringify({ errors: [{ message: errorTypes.serverError }] }),
      );
    }
  });
}

module.exports = {
  createServer,
};
