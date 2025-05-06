// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here
const http = require('http');
// import http from 'http';

const { convertToCase } = require('./convertToCase');

const createServer = () => {
  return http.createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const toCase = url.searchParams.get('toCase');
    const PATH = url.pathname.slice(1);
    const errors = [];

    if (!toCase) {
      errors.push({
        message:
          // eslint-disable-next-line
          '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    } else {
      const supportedCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

      if (!supportedCases.includes(toCase.toUpperCase())) {
        errors.push({
          message:
            // eslint-disable-next-line
            'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
        });
      }
    }

    if (!PATH) {
      errors.push({
        message:
          // eslint-disable-next-line
          'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (errors.length > 0) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.write(JSON.stringify({ errors }));

      return res.end();
    }

    const text = convertToCase(PATH, toCase.toUpperCase());

    const objectToReturn = {
      originalText: PATH,
      targetCase: toCase,
      originalCase: text.originalCase,
      convertedText: text.convertedText,
    };

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(objectToReturn));
  });
};

module.exports = { createServer };
