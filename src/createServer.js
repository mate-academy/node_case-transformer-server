// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here

const http = require('http');
const { convertToCase } = require('./convertToCase');

function createServer() {
  const server = http.createServer((req, res) => {
    const [pathName, queryParams] = req.url.split('?');
    const text = pathName.slice(1);
    const params = new URLSearchParams(queryParams);
    const toCase = params.get('toCase');

    const errors = [];

    if (!text) {
      errors.push({
        // eslint-disable-next-line max-len
        message: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!toCase) {
      errors.push({
        // eslint-disable-next-line max-len
        message: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (toCase !== 'SNAKE'
      && toCase !== 'KEBAB'
      && toCase !== 'CAMEL'
      && toCase !== 'PASCAL'
      && toCase !== 'UPPER'
      && toCase) {
      errors.push({
        // eslint-disable-next-line max-len
        message: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (errors.length > 0) {
      const errorResponse = {
        errors,
      };

      res.setHeader('Content-Type', 'application/json');

      res.statusCode = 400;
      res.statusText = 'Bad request';

      res.end(JSON.stringify(errorResponse));

      return;
    }

    const result = convertToCase(text, toCase);

    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;

    const formatedResponse = {
      originalCase: result.originalCase,
      targetCase: toCase,
      originalText: text,
      convertedText: result.convertedText,
    };

    res.end(JSON.stringify(formatedResponse));
  });

  return server;
}

module.exports = { createServer };
