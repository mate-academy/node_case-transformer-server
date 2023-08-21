/* eslint-disable max-len */
// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here
const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase.js');
const cases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function isValidCase(someCase) {
  return cases.includes(someCase);
}

function createServer() {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-type', 'application/json');

    const url = new URL(req.url, `http://${req.headers.host}`);
    const newCase = url.searchParams.get('toCase');
    const recievedText = url.pathname.slice(1);

    if (!newCase || !recievedText || !isValidCase(newCase)) {
      const errorResponse = {
        errors: [],
      };

      if (!recievedText) {
        errorResponse.errors.push({
          message: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
        });
      }

      if (!newCase) {
        errorResponse.errors.push({
          message: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
        });
      } else if (!isValidCase(newCase)) {
        errorResponse.errors.push({
          message: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
        });
      }
      res.statusCode = 400;
      res.statusMessage = 'Bad request';

      return res.end(JSON.stringify(errorResponse));
    }

    const { originalCase, convertedText } = convertToCase(recievedText, newCase);

    const response = {
      originalCase,
      convertedText,
      targetCase: newCase,
      originalText: recievedText,
    };

    res.statusCode = 200;
    res.statusMessage = 'OK';
    res.end(JSON.stringify(response));
  });

  return server;
};

createServer();

module.exports = { createServer };
