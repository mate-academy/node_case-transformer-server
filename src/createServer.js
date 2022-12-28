/* eslint-disable max-len */
const http = require('http');
const { convertToCase } = require('./convertToCase');

const cases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

const createServer = () => {
  const server = http.createServer((req, res) => {
    const normalizedURL = new URL(req.url, `http://${req.headers.host}`);

    const text = normalizedURL.pathname.slice(1);
    const toCase = normalizedURL.searchParams.get('toCase');

    const errors = [];

    res.setHeader('Content-Type', 'application/json');

    if (!text.length) {
      errors.push({
        message: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!toCase) {
      errors.push({
        message: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    } else if (!cases.includes(toCase)) {
      errors.push({
        message: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (errors.length) {
      const errorResponse = {
        errors,
      };

      res.statusCode = 400;
      res.statusText = 'Bad request';

      res.end(JSON.stringify(errorResponse));

      return;
    }

    const {
      originalCase,
      convertedText,
    } = convertToCase(text, toCase);

    const response = {
      originalCase,
      targetCase: toCase,
      originalText: text,
      convertedText,
    };

    res.statusCode = 200;
    res.statusText = 'OK';

    res.end(JSON.stringify(response));
  });

  return server;
};

module.exports = { createServer };
