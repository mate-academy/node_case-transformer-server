// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here
const http = require('http');
const { convertToCase } = require('./convertToCase');

function createServer() {
  const typeOfCases = new Set(['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER']);

  const server = http.createServer((req, res) => {
    const baseUrl = new URL(req.url, `http://${req.headers.host}`);
    const originalText = baseUrl.pathname.slice(1);
    const caseName = baseUrl.searchParams.get('toCase');

    res.setHeader('content-type', 'application/json');

    const errors = [];

    if (!caseName) {
      errors.push({
        message:
          '"toCase" query param is required. Correct request is:' +
          ' "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!originalText) {
      errors.push({
        message:
          'Text to convert is required. Correct request is:' +
          ' "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (caseName && !typeOfCases.has(caseName)) {
      errors.push({
        message:
          'This case is not supported. Available cases:' +
          ' SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (!typeOfCases.has(caseName) || !caseName || !originalText) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';

      return res.end(
        JSON.stringify({
          errors,
        }),
      );
    }

    const modifiedWords = convertToCase(originalText, caseName);

    res.end(
      JSON.stringify({ ...modifiedWords, originalText, targetCase: caseName }),
    );
  });

  return server;
}

module.exports = {
  createServer,
};
