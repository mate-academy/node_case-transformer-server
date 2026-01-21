/* eslint-disable max-len */
/* eslint-disable no-console */

const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase.js');

const textIsMissing = 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';
const caseIsMissing = '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';
const caseIsNotSupported = 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.';

function createServer() {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const normalizedURL = new URL(req.url, `http://${req.headers.host}`);

    const textToConvert = normalizedURL.pathname.slice(1) || false;
    const toCase = normalizedURL.searchParams.get('toCase');
    const availableCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

    const errors = [];

    if (!textToConvert) {
      errors.push({ message: textIsMissing });
    }

    if (!toCase) {
      errors.push({ message: caseIsMissing });
    } else if (!availableCases.includes(toCase)) {
      errors.push({ message: caseIsNotSupported });
    }

    if (errors.length !== 0) {
      res.statusCode = 400;
      res.end(JSON.stringify({ errors }));
    } else {
      const result = convertToCase(textToConvert, toCase);

      const body = {
        originalCase: result.originalCase,
        targetCase: toCase,
        originalText: textToConvert,
        convertedText: result.convertedText,
      };

      res.statusCode = 200;

      res.end(JSON.stringify(body));
    }
  });

  return server;
}

module.exports = { createServer };
