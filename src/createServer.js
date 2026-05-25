/* eslint-disable no-console */
// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here
function createServer() {
  const http = require('http');
  const { convertToCase } = require('./convertToCase/convertToCase');

  // const PORT = process.env.PORT || 3000;

  const server = http.createServer((req, res) => {
    const [textToConvert, query = ''] = req.url.slice(1).split('?');
    const toCase = new URLSearchParams(query).get('toCase');

    res.setHeader('Content-Type', 'application/json');

    const errors = [];

    if (textToConvert.length === 0) {
      errors.push({
        message:
          // eslint-disable-next-line max-len
          'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (toCase === null) {
      errors.push({
        message:
          // eslint-disable-next-line max-len
          '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (
      toCase !== null &&
      toCase !== 'SNAKE' &&
      toCase !== 'KEBAB' &&
      toCase !== 'CAMEL' &&
      toCase !== 'PASCAL' &&
      toCase !== 'UPPER'
    ) {
      errors.push({
        message:
          // eslint-disable-next-line max-len
          'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (errors.length > 0) {
      res.statusCode = 400;

      res.end(
        JSON.stringify({
          errors: [...errors],
        }),
      );

      return;
    }

    res.statusCode = 200;

    res.end(
      JSON.stringify({
        ...convertToCase(textToConvert, toCase),
        originalText: textToConvert,
        targetCase: toCase,
      }),
    );
  });

  return server;
}

module.exports = {
  createServer,
};
