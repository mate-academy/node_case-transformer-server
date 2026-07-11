// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here
// eslint-disable-next-line max-len
const http = require('http');
const { SUPPORTED_CASES } = require('./constants');
const { convertToCase } = require('./convertToCase/index');

const createServer = () => {
  const PORT = process.env.PORT || 5701;

  const server = http.createServer((req, res) => {
    const normalizedURL = new URL(req.url, `http://localhost:${PORT}`);

    const originalText = normalizedURL.pathname.slice(1);
    const targetCase = normalizedURL.searchParams.get('toCase');

    const errors = [];

    /* eslint-disable max-len */

    if (!originalText) {
      errors.push({
        message:
          'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!targetCase) {
      errors.push({
        message:
          '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!SUPPORTED_CASES.includes(targetCase) && targetCase) {
      errors.push({
        message:
          'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    /* eslint-enable max-len */

    if (errors.length > 0) {
      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 400;
      res.statusMessage = 'Bad request';

      res.end(
        JSON.stringify({
          errors,
        }),
      );

      return;
    }

    const { originalCase, convertedText } = convertToCase(
      originalText,
      targetCase,
    );

    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;
    res.statusMessage = 'OK';

    res.end(
      JSON.stringify({
        originalCase,
        targetCase,
        originalText,
        convertedText,
      }),
    );
  });

  return server;
};

module.exports = { createServer };
