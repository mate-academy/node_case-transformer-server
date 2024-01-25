/* eslint-disable max-len */
const http = require('http');
const { convertToCase } = require('./convertToCase');

const VALIDATION_ERRORS = {
  NO_TEXT: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  NO_CASE: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  INVALID_CASE: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
};

const createServer = () => {
  const cases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const path = new URL(req.url, `http://${req.headers.host}`);

    const originalText = path.pathname.slice(1);
    const targetCase = path.searchParams.get('toCase');

    const errorMessages = {
      errors: [],
    };

    if (!originalText) {
      errorMessages.errors.push({ message: VALIDATION_ERRORS.NO_TEXT });
    }

    if (!targetCase) {
      errorMessages.errors.push({ message: VALIDATION_ERRORS.NO_CASE });
    }

    if (!cases.includes(targetCase) && targetCase) {
      errorMessages.errors.push({ message: VALIDATION_ERRORS.INVALID_CASE });
    }

    if (errorMessages.errors.length) {
      res.statusCode = 400;
      res.end(JSON.stringify(errorMessages));
    } else {
      const { originalCase, convertedText } = convertToCase(originalText, targetCase);

      res.statusCode = 200;

      res.end(JSON.stringify({
        originalCase,
        targetCase,
        originalText,
        convertedText,
      }));
    }
  });

  return server;
};

module.exports = { createServer };
