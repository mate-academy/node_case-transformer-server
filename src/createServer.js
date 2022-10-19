// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here
const http = require('http');
const { convertToCase } = require('./convertToCase');

function createServer() {
  return http.createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);

    const textToConvert = url.pathname.slice(1);

    const params = Object.fromEntries(url.searchParams.entries());

    const toCase = params.toCase;

    const allCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

    const errors = [];

    res.setHeader('Content-Type', 'application/json');

    if (!textToConvert) {
      errors.push({
        message: 'Text to convert is required. Correct request is: '
          + '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    };

    if (!toCase) {
      errors.push({
        message: '"toCase" query param is required. '
        + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    };

    if (!allCases.includes(toCase) && toCase) {
      errors.push({
        message: 'This case is not supported. '
        + 'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    };

    if (errors.length) {
      res.statusCode = 400;
      res.statusText = 'Bad request';

      res.end(JSON.stringify({ errors }));

      return;
    }

    const { originalCase, convertedText } = convertToCase(
      textToConvert, toCase,
    );

    res.end(JSON.stringify({
      originalCase,
      convertedText,
      targetCase: toCase,
      originalText: textToConvert,
    }));
  });
};

module.exports = { createServer };
