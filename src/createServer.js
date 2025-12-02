/* eslint-disable max-len */
// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here
const http = require('http');

const { convertToCase } = require('./convertToCase/index');

const SUPPORTED_CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

const createServer = () => {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const normalizedURL = new URL(req.url, `http://localhost:5700`);

    const textToConvert = normalizedURL.pathname.slice(1);
    const searchParams = normalizedURL.searchParams.get('toCase');

    const errors = [];

    if (!textToConvert) {
      errors.push({
        message:
          'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!searchParams) {
      errors.push({
        message:
          '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (searchParams && !SUPPORTED_CASES.includes(searchParams)) {
      errors.push({
        message:
          'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (errors.length > 0) {
      res.statusCode = 400;
      res.statusMessage = 'Bad Request';
      res.end(JSON.stringify({ errors }));

      return;
    }

    const { originalCase, convertedText } = convertToCase(
      textToConvert,
      searchParams,
    );

    const responseBody = {
      originalCase,
      targetCase: searchParams,
      originalText: textToConvert,
      convertedText,
    };

    res.statusCode = 200;
    res.statusMessage = 'OK';
    res.end(JSON.stringify(responseBody));
  });

  return server;
};

module.exports = { createServer };
