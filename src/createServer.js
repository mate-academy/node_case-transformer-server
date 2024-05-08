const http = require('http');
const { convertToCase } = require('../src/convertToCase/convertToCase.js');
const { errorTypes } = require('./errorTypes.js');

const CASES = new Set(['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER']);

function createServer() {
  return http.createServer((req, res) => {
    const normalizedUrl = new URL(req.url, `http://${req.headers.host}`);

    const errors = [];

    const toCase = normalizedUrl.searchParams.get('toCase');

    if (!toCase) {
      errors.push({
        message: errorTypes.toCaseRequired,
      });
    } else if (!CASES.has(toCase.toUpperCase())) {
      errors.push({
        message: errorTypes.toCaseNotSupported,
      });
    }

    const textToConvert = normalizedUrl.pathname.slice(1);

    if (!textToConvert) {
      errors.push({
        message: errorTypes.textToConvertRequired,
      });
    }

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

    if (originalCase !== null && convertedText !== null) {
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
