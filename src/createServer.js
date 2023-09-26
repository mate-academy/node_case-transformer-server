'use strict';

const http = require('http');
const { convertToCase } = require('./convertToCase');

const createServer = () => {
  const server = http.createServer((req, res) => {
    const normalizedURL = new URL(req.url, `http://${req.headers.host}`);
    const originalText = normalizedURL.pathname.slice(1);

    const targetCase = normalizedURL.searchParams.get('toCase');

    res.setHeader('Content-Type', 'application/json');

    const arrOfCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

    const errors = [];

    if (!originalText) {
      errors.push({
        message: 'Text to convert is required. Correct request is:'
          + ' "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    };

    if (!targetCase) {
      errors.push({
        message: '"toCase" query param is required.'
          + ' Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    };

    if (targetCase && arrOfCases.indexOf(targetCase) === -1) {
      errors.push({
        message: 'This case is not supported.'
          + ' Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    };

    if (errors.length) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      res.end(JSON.stringify({ errors }));

      return errors;
    };

    const {
      originalCase,
      convertedText,
    } = convertToCase(originalText, targetCase);

    res.statusCode = 200;
    res.statusMessage = 'OK';

    res.end(JSON.stringify({
      originalCase, targetCase, originalText, convertedText,
    }));
  });

  return server;
};

module.exports = { createServer };
