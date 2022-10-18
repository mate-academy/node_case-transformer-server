// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here
const { convertToCase } = require('./convertToCase');
const http = require('http');

function createServer() {
  return http.createServer((req, res) => {
    const normalizedURL = new URL(req.url, `http://${req.headers.host}`);
    const cases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
    const errors = [];
    const originalText = normalizedURL.pathname.slice(1);
    const params = Object.fromEntries(normalizedURL.searchParams.entries());
    const targetCase = params.toCase;

    if (!originalText) {
      errors.push({
        message: 'Text to convert is required. Correct request is:'
        + ' "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!targetCase) {
      errors.push({
        message: '"toCase" query param is required. Correct request is: "/'
        + '<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!cases.includes(targetCase) && targetCase) {
      errors.push({
        message: 'This case is not supported. Available cases: '
        + 'SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    res.setHeader('Content-Type', 'application/json');

    if (errors.length) {
      res.statusCode = 400;
      res.statusText = 'Bad request';

      res.end(JSON.stringify({ errors }));

      return;
    }

    const { originalCase, convertedText }
      = convertToCase(originalText, targetCase);

    res.statusCode = 200;
    res.statusText = 'OK';

    res.end(JSON.stringify({
      originalCase,
      targetCase,
      originalText,
      convertedText,
    }));
  });
}

module.exports = {
  createServer,
};
