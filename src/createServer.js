/* eslint-disable max-len */
// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here

const http = require('http');
const { convertToCase } = require('./convertToCase');

const createServer = () => {
  return http.createServer((req, res) => {
    const url = new URL(req.url, 'http://localhost');
    const toCase = url.searchParams.get('toCase');
    const textToConvert = url.pathname.slice(1);
    const errors = [];

    if (!textToConvert) {
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
    } else {
      if (!['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'].includes(toCase)) {
        errors.push({
          message:
            'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
        });
      }
    }

    if (errors.length > 0) {
      res.statusCode = 400;
      res.statusMessage = 'Bad Request';
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ errors }));

      return;
    }

    const result = convertToCase(textToConvert, toCase);

    res.statusCode = 200;
    res.statusMessage = 'OK';
    res.setHeader('Content-Type', 'application/json');

    res.end(
      JSON.stringify({
        originalCase: result.originalCase,
        targetCase: toCase,
        originalText: textToConvert,
        convertedText: result.convertedText,
      }),
    );
  });
};

module.exports = {
  createServer,
};
