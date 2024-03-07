/* eslint-disable max-len */
// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here
const http = require('http');
const { convertToCase } = require('./convertToCase');
const VALIDCASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function handleErrors(textToConvert, toCase) {
  const errors = [];

  if (!textToConvert) {
    errors.push('Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".');
  }

  if (!toCase) {
    errors.push('"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".');
  } else if (!VALIDCASES.includes(toCase.toUpperCase())) {
    errors.push('This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.');
  }

  return errors;
}

function createServer() {
  const server = http.createServer((req, res) => {
    const normalizedURL = new URL(req.url, `http://${req.headers.host}`);
    const textToConvert = normalizedURL.pathname.slice(1);
    const toCase = normalizedURL.searchParams.get('toCase');

    try {
      const errors = handleErrors(textToConvert, toCase);

      if (errors.length > 0) {
        throw errors;
      }

      const { originalCase, convertedText } = convertToCase(textToConvert, toCase.toUpperCase());

      res.writeHead(200, { 'Content-Type': 'application/json' });

      const response = {
        originalCase,
        targetCase: toCase.toUpperCase(),
        originalText: textToConvert,
        convertedText,
      };

      res.end(JSON.stringify(response));
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
