// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here
const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');
const allowedCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function createServer() {
  const server = http.createServer((req, res) => {
    const arrOfParams = req.url.split('?');
    const textToConvert = arrOfParams[0].slice(1);
    const queryString = arrOfParams[1] || '';
    const params = new URLSearchParams(queryString);
    const toCase = params.get('toCase');
    const errors = [];

    if (!textToConvert) {
      errors.push({
        message:
          'Text to convert is required. Correct request is: ' +
          '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!toCase) {
      errors.push({
        message:
          '"toCase" query param is required. Correct request is: ' +
          '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    } else if (!allowedCases.includes(toCase)) {
      errors.push({
        message:
          'This case is not supported. ' +
          'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (errors.length > 0) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      res.setHeader('Content-Type', 'application/json');

      const responseBodyErr = {
        errors: errors,
      };

      res.end(JSON.stringify(responseBodyErr));

      return;
    }

    res.statusCode = 200;
    res.statusMessage = 'OK';
    res.setHeader('Content-Type', 'application/json');

    const result = convertToCase(textToConvert, toCase);

    const responseBody = {
      originalCase: result.originalCase,
      targetCase: toCase,
      originalText: textToConvert,
      convertedText: result.convertedText,
    };

    res.end(JSON.stringify(responseBody));
  });

  return server;
}

module.exports = { createServer };
