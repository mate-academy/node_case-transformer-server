// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here

const http = require('http');
const { convertToCase } = require('./convertToCase');
const apiUrl = 'http://localhost:5700';
const validCasesNames = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function createServer() {
  return http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const errors = [];
    const normalizedURL = new URL(req.url, apiUrl);
    const toCaseParam = normalizedURL.searchParams.get('toCase');

    if (normalizedURL.pathname === '/') {
      errors.push({
        message:
          'Text to convert is required. ' +
          'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!toCaseParam) {
      errors.push({
        message:
          '"toCase" query param is required. ' +
          'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (toCaseParam && !validCasesNames.includes(toCaseParam)) {
      errors.push({
        message:
          'This case is not supported. ' +
          'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (errors.length > 0) {
      const errorResponse = {
        errors: errors,
      };

      res.statusCode = 400;
      res.end(JSON.stringify(errorResponse));

      return;
    }

    const text = normalizedURL.pathname.replace('/', '');

    const convertedText = convertToCase(text, toCaseParam);

    const response = {
      originalCase: convertedText.originalCase,
      targetCase: toCaseParam,
      originalText: text,
      convertedText: convertedText.convertedText,
    };

    res.statusCode = 200;
    res.end(JSON.stringify(response));
  });
}

module.exports = { createServer };
