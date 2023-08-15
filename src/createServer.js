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
    const Case = url.searchParams.get('toCase');
    const recievedText = url.pathname.slice(1);

    const isError = !Case || !recievedText || !isValidCase(Case);

    if (isError) {
      const errorResponse = {
        errors: [],
      };

      if (!recievedText) {
        errorResponse.errors.push({
          message: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
        });
      }

      if (!Case) {
        errorResponse.errors.push({
          message: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
        });
      } else if (!isValidCase(Case)) {
        errorResponse.errors.push({
          message: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
        });
      }
      res.statusCode = 400;
      res.statusMessage = 'Bad request';

      return res.end(JSON.stringify(errorResponse));
    }

    const { originalCase, convertedText } = convertToCase(recievedText, Case);

    const response = {
      originalCase,
      convertedText,
      targetCase: Case,
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
