/* eslint-disable max-len */
/* eslint-disable no-console */
// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here
const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase.js');

function createServer() {
  const SUPPORTED_CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

  const server = http.createServer((req, res) => {
    const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
    const textToTransform = parsedUrl.pathname.replace('/', '');
    const param = parsedUrl.searchParams.get('toCase');

    const errors = [];

    if (!textToTransform || textToTransform.length < 1) {
      errors.push({
        message:
          'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!param) {
      errors.push({
        message:
          '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    } else if (!SUPPORTED_CASES.includes(param)) {
      errors.push({
        message:
          'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (errors.length > 0) {
      res.writeHead(400, 'Bad request', { 'Content-Type': 'application/json' });

      res.end(JSON.stringify({ errors: errors }));
    } else {
      res.writeHead(200, { 'content-type': 'application/json' });

      const result = convertToCase(textToTransform, param);

      const response = {
        originalCase: result.originalCase,
        targetCase: param,
        originalText: textToTransform,
        convertedText: result.convertedText,
      };

      res.end(JSON.stringify(response));
    }
  });

  return server;
}

module.exports = { createServer };
