/* eslint-disable max-len */
/* eslint-disable no-console */

// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here

const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');

function createServer() {
  return http.createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);

    const originalText = url.pathname.slice(1);
    const targetCase = url.searchParams.get('toCase');
    const validTargetCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

    const errors = [];

    if (!originalText) {
      errors.push({
        message:
          'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!targetCase) {
      errors.push({
        message:
          '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    } else {
      const isValidTargetCase = validTargetCases.includes(targetCase);

      if (!isValidTargetCase) {
        errors.push({
          message:
            'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
        });
      }
    }

    if (errors.length > 0) {
      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 400;
      res.end(JSON.stringify({ errors }));

      return;
    }

    const conversionResult = convertToCase(originalText, targetCase);

    const responseData = {
      originalCase: conversionResult.originalCase,
      targetCase,
      convertedText: conversionResult.convertedText,
      originalText,
    };

    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;
    res.end(JSON.stringify(responseData));
  });
}

module.exports = {
  createServer,
};
