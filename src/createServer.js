/* eslint-disable no-console */
/* eslint-disable max-len */
const http = require('http');
const { convertToCase } = require('./convertToCase');

const handleErrors = (res, errors) => {
  res.end(JSON.stringify({ errors }));
};

const handleConversion = (res, originalText, targetCase) => {
  const { originalCase, convertedText } = convertToCase(originalText, targetCase);

  res.end(JSON.stringify({
    originalCase, targetCase, originalText, convertedText,
  }));
};

const createServer = () => {
  const cases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const path = new URL(req.url, 'http://localhost');
    const originalText = path.pathname.slice(1);
    const targetCase = path.searchParams.get('toCase');

    const errorMessages = {
      errors: [],
    };

    if (!originalText) {
      errorMessages.errors.push({
        message: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!targetCase) {
      errorMessages.errors.push({
        message: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!cases.includes(targetCase) && targetCase) {
      errorMessages.errors.push({
        message: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (!errorMessages.errors.length) {
      handleConversion(res, originalText, targetCase);
    } else {
      res.statusCode = 400;
      handleErrors(res, errorMessages.errors);
    }
  });

  return server;
};

module.exports = { createServer };
