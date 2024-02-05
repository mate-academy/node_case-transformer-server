'use strict';

const http = require('http');
const { convertToCase } = require('./convertToCase');

function createServer() {
  const cases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
  const server = http.createServer((req, res) => {
    res.setHeader('content-type', 'application/json');

    const url = req.url.split('?');
    const textToConvert = url[0].slice(1);
    const params = new URLSearchParams(url[1]);
    const toCase = params.get('toCase');
    const errors = [];

    if (!textToConvert) {
      errors.push({
        message:
          'Text to convert is required. '
          + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!toCase) {
      errors.push({
        message:
          '"toCase" query param is required. '
          + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (toCase && !cases.includes(toCase)) {
      errors.push({
        message:
          'This case is not supported. '
          + 'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (errors.length) {
      res.statusCode = 400;
      res.end(JSON.stringify({ errors }));

      return;
    }

    const result = convertToCase(textToConvert, toCase);

    result.targetCase = toCase;
    result.originalText = textToConvert;

    res.statusCode = 200;
    res.end(JSON.stringify(result));
  });

  return server;
};

module.exports = {
  createServer,
};
