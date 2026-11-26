// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here
/* eslint-disable max-len */
const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase.js');

const SUPPORTED_CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function createServer() {
  const server = http.createServer((req, res) => {
    const [pathname, queryString] = req.url.split('?');
    const normalizedText = pathname.slice(1);
    const params = new URLSearchParams(queryString);
    const toCase = params.get('toCase') || null;
    const errors = [];

    if (!normalizedText) {
      errors.push({
        message:
          'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!toCase) {
      errors.push({
        message:
          '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    } else if (!SUPPORTED_CASES.includes(toCase)) {
      errors.push({
        message:
          'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (errors.length) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      res.setHeader('Content-Type', 'application/json');

      const errorBody = JSON.stringify({ errors });

      res.end(errorBody);

      return;
    }

    const { originalCase, convertedText } = convertToCase(
      normalizedText,
      toCase,
    );

    res.statusCode = 200;
    res.statusMessage = 'OK';
    res.setHeader('Content-Type', 'application/json');

    const responseBody = JSON.stringify({
      originalCase,
      targetCase: toCase,
      originalText: normalizedText,
      convertedText,
    });

    res.end(responseBody);
  });

  return server;
}

module.exports = { createServer };
