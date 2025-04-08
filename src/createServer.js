/* eslint-disable max-len */
// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here

const http = require('http');
const convertToCase = require('./convertToCase/index').convertToCase;
const allowedCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function createServer() {
  return http.createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);

    const text = url.pathname.slice(1);
    const toCase = url.searchParams.get('toCase');

    const errors = [];

    if (!toCase) {
      errors.push({
        message:
          '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    } else if (!allowedCases.includes(toCase.toUpperCase())) {
      errors.push({
        message:
          'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (!text) {
      errors.push({
        message:
          'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (errors.length === 0) {
      try {
        const converted = convertToCase(text, toCase);

        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 200;

        const result = {
          originalCase: converted.originalCase,
          targetCase: toCase,
          originalText: text,
          convertedText: converted.convertedText,
        };

        res.end(JSON.stringify(result));
      } catch (err) {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json');

        errors.push({
          message:
            'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
        });

        res.end(JSON.stringify({ errors: errors }));
      }
    } else {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ errors: errors }));
    }
  });
}

module.exports = {
  createServer,
};
