/* eslint-disable max-len */
const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');

const createServer = () => {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const normalizedURL = new URL(req.url, `http://${req.headers.host}`);

    const targetCase = normalizedURL.searchParams.get('toCase');
    const originalText = normalizedURL.pathname.slice(1);

    const error = {
      errors: [],
    };

    const casesToConvert = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

    if (!originalText.length) {
      const newError = {
        message: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      };

      error.errors.push(newError);
    }

    if (targetCase === null) {
      const newError = {
        message: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      };

      error.errors.push(newError);
    } else if (!casesToConvert.includes(targetCase)) {
      const newError = {
        message: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      };

      error.errors.push(newError);
    }

    if (error.errors.length) {
      res.statusCode = 400;
      res.end(JSON.stringify(error));
    } else {
      const convertedResult = convertToCase(originalText, targetCase);

      res.statusCode = 200;

      res.end(JSON.stringify({
        ...convertedResult,
        targetCase,
        originalText,
      }));
    };
  });

  return server;
};

module.exports = { createServer };
