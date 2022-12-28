// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here
const http = require('http');
const { convertToCase } = require('./convertToCase');

function createServer() {
  const server = http.createServer((req, res) => {
    const normalizedURL = new URL(req.url, `http://${req.headers.host}`);
    const originalText = normalizedURL.pathname.slice(1);
    const targetCase = normalizedURL.searchParams.get('toCase');
    const cases = ['SNAKE', 'KEBAB', 'UPPER', 'PASCAL', 'CAMEL'];

    const errors = [];

    res.setHeader('Content-Type', 'application/json');

    if (originalText.length === 0) {
      errors.push({
        message: 'Text to convert is required.'
        + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (targetCase && !(cases.includes(targetCase))) {
      errors.push({
        message: 'This case is not supported.'
        + 'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (!targetCase) {
      errors.push({
        message: '"toCase" query param is required.'
        + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (errors.length > 0) {
      const errorResponse = {
        errors,
      };

      res.statusCode = 400;
      res.statusMessage = 'Bad request';

      res.end(JSON.stringify(errorResponse));

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
}

module.exports = {
  createServer,
};
