/* eslint-disable no-console */
// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here
const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');

function createServer() {
  const server = http.createServer((req, res) => {
    const cases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
    const url = new URL(req.url, `http://${req.headers.host}`);
    const params = new URLSearchParams(url.search);

    const text = url.pathname.slice(1);
    const toCase = params.get('toCase');
    const errors = [];

    if (!text) {
      errors.push({
        message:
          'Text to convert is required. ' +
          'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!toCase) {
      errors.push({
        message:
          '"toCase" query param is required. ' +
          'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (toCase && !cases.includes(toCase)) {
      errors.push({
        message:
          'This case is not supported. ' +
          'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (errors.length === 0) {
      res.writeHead(200, { 'Content-Type': 'application/json' });

      const convertedData = convertToCase(text, toCase);

      const objToReturn = {
        ...convertedData,
        targetCase: toCase,
        originalText: text,
      };

      res.end(JSON.stringify(objToReturn));
    } else {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ errors }));
    }
  });

  return server;
}

module.exports = { createServer };
