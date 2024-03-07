/* eslint-disable max-len */
// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here
const http = require('http');
const { convertToCase } = require('./convertToCase');

function createServer() {
  const server = http.createServer((req, res) => {
    try {
      const normalizedURL = new URL(req.url, `http://${req.headers.host}`);
      const textToConvert = normalizedURL.pathname.slice(1);
      const toCase = normalizedURL.searchParams.get('toCase');
      const validCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

      const errors = [];

      if (!textToConvert) {
        errors.push('Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".');
      }

      if (!toCase) {
        errors.push('"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".');
      } else if (!validCases.includes(toCase.toUpperCase())) {
        errors.push('This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.');
      }

      if (errors.length > 0) {
        throw errors;
      }

      const result = convertToCase(textToConvert, toCase.toUpperCase());

      res.writeHead(200, { 'Content-Type': 'application/json' });

      res.end(JSON.stringify({
        originalCase: result.originalCase,
        targetCase: toCase.toUpperCase(),
        originalText: textToConvert,
        convertedText: result.convertedText,
      }));
    } catch (errors) {
      res.writeHead(400, 'Bad Request', { 'Content-Type': 'application/json' });

      res.end(JSON.stringify(
        {
          errors: errors.map(error => ({
            message: error,
          })),
        },
      ));
    }
  });

  return server;
}

module.exports = {
  createServer,
};
