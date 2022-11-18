// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here

// import http from 'http';

const http = require('http');
const { convertToCase } = require('./convertToCase');

const availableCase = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

const createServer = () => {
  const server = http.createServer((req, res) => {
    const normalizedUrl = new URL(req.url, `http://${req.headers.host}`);

    let response = {};
    const errors = [];

    const textToConvert = normalizedUrl.pathname.slice(1);
    const toCase = normalizedUrl.searchParams.get('toCase');

    if (textToConvert.length === 0) {
      errors.push({
        message: 'Text to convert is required. '
        + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!toCase) {
      errors.push({
        message: '"toCase" query param is required. '
        + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    } else if (!availableCase.includes(toCase)) {
      errors.push({
        message: 'This case is not supported. '
        + 'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (errors.length > 0) {
      response.errors = errors;
      res.statusCode = 400;
      res.statusText = 'Bad request';
    } else {
      const {
        originalCase,
        convertedText,
      } = convertToCase(textToConvert, toCase);

      response = {
        originalCase,
        targetCase: toCase,
        originalText: textToConvert,
        convertedText,
      };
    }

    res.setHeader('Content-Type', 'application/json');

    res.end(JSON.stringify(response));
  });

  return server;
};

module.exports = {
  createServer,
};
