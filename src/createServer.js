/* eslint-disable max-len */
const http = require('http');
const { convertToCase } = require('./convertToCase');

const ERROR_MESSAGES = {
  NO_TEXT:
    'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  NO_CASE:
    '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  WRONG_CASE:
    'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
};

const SUPPORTED_CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function createServer() {
  const server = http.createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const originalText = url.pathname.replace('/', '');
    const targetCase = url.searchParams.get('toCase');
    const errors = [];

    res.setHeader('Content-Type', 'application/json');

    if (!originalText) {
      errors.push({ message: ERROR_MESSAGES.NO_TEXT });
    }

    if (!targetCase) {
      errors.push({ message: ERROR_MESSAGES.NO_CASE });
    }

    if (targetCase && !SUPPORTED_CASES.includes(targetCase.toUpperCase())) {
      errors.push({ message: ERROR_MESSAGES.WRONG_CASE });
    }

    if (errors.length) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      res.end(JSON.stringify({ errors }));

      return;
    }

    const { originalCase, convertedText } = convertToCase(
      originalText,
      targetCase,
    );

    res.statusCode = 200;
    res.statusMessage = 'OK';

    const result = {
      originalCase,
      targetCase,
      originalText,
      convertedText,
    };

    res.end(JSON.stringify(result));
  });

  return server;
}

module.exports = { createServer };
