// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here
const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');

function createServer() {
  return http.createServer((request, response) => {
    const normalizedURL = new URL(request.url, `http://${request.headers.host}`);
    const originalText = normalizedURL.pathname.slice(1);
    const targetCase = normalizedURL.searchParams.get('toCase');

    const caseNames = ['SNAKE', 'KEBAB', 'UPPER', 'PASCAL', 'CAMEL'];

    let responseData = {};

    response.setHeader('content-type', 'application/json');

    const errors = [];

    if (originalText.length === 0) {
      errors.push({
        message: 'Text to convert is required.'
          + ' Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!targetCase) {
      errors.push({
        message: '"toCase" query param is required.'
          + ' Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    } else if (!caseNames.includes(targetCase)) {
      errors.push({
        message: 'This case is not supported.'
          + ' Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (errors.length) {
      responseData = {
        errors,
      };

      response.statusCode = 400;
      response.statusMessage = 'Bad request';
    } else {
      const {
        originalCase,
        convertedText,
      } = convertToCase(originalText, targetCase);

      responseData = {
        originalCase,
        targetCase,
        originalText,
        convertedText,
      };
    }

    response.end(JSON.stringify(responseData));
  });
}

module.exports = { createServer };
