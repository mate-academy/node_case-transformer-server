/* eslint-disable no-console */
// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here
const http = require('http');
const { convertToCase } = require('./convertToCase');

function createServer() {
  const server = http.createServer((req, res) => {
    const normalizedUrl = new URL(req.url, `http://${req.headers.host}`);

    const originalText = normalizedUrl.pathname.slice(1);
    const targetCase = normalizedUrl.search.split('=')[1];
    const cases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
    const errors = [];

    res.setHeader('content-type', 'application/json');

    if (!originalText) {
      errors.push({
        message: 'Text to convert is required. '
        + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!targetCase) {
      errors.push({
        message: '"toCase" query param is required. '
        + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (targetCase && !cases.includes(targetCase)) {
      errors.push({
        message: 'This case is not supported. '
        + 'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (errors.length) {
      res.statusCode = 400;
      res.statusText = 'Bad request';

      res.end(JSON.stringify({
        errors,
      }));

      return;
    }

    const {
      originalCase,
      convertedText,
    } = convertToCase(originalText, targetCase);

    res.statusCode = 200;
    res.statusMessage = 'OK';

    res.end(JSON.stringify({
      originalCase,
      targetCase,
      originalText,
      convertedText,
    }));
  });

  return server;
};

module.exports = { createServer };
