/* eslint-disable max-len */
const http = require('http');
const { convertToCase } = require('./convertToCase');

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
      errorMessages.errors
        .push({
          message: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
        });
    }

    if (!targetCase) {
      errorMessages.errors
        .push({
          message: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
        });
    }

    if (!cases.includes(targetCase) && targetCase) {
      errorMessages.errors
        .push({
          message: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
        });
    }

    if (!errorMessages.errors.length) {
      const { originalCase, convertedText } = convertToCase(originalText, targetCase);

      res.end(JSON.stringify({
        originalCase, targetCase, originalText, convertedText,
      }));
    } else {
      res.end(JSON.stringify(errorMessages));
    }
  });

  return server;
};

module.exports = { createServer };
