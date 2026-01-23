/* eslint-disable max-len */
/* eslint-disable no-console */
// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here
const http = require('http');

const { convertToCase } = require('./convertToCase/convertToCase');

const validCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

const createServer = () => {
  const server = http.createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const text = url.pathname.substring(1);
    const caseName = url.searchParams.get('toCase');

    const errors = [];

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');

    if (!text) {
      errors.push({
        message:
          'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!caseName) {
      errors.push({
        message:
          '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (caseName && !validCases.includes(caseName)) {
      errors.push({
        message:
          'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (errors.length > 0) {
      res.statusCode = 400;
      res.end(JSON.stringify({ errors }));

      return;
    }

    const { convertedText, originalCase } = convertToCase(text, caseName);

    const result = {
      originalCase: originalCase,
      targetCase: caseName,
      originalText: text,
      convertedText: convertedText,
    };

    res.end(JSON.stringify(result));
  });

  return server;
};

module.exports = { createServer };
