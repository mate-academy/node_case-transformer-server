// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here
const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase.js');

function createServer() {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const errors = [];
    const availableCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

    const [pathPart, queryString] = req.url.split('?');

    const originalText = pathPart.slice(1);

    const params = new URLSearchParams(queryString || '');

    const targetCase = params.get('toCase');

    if (!originalText) {
      errors.push({
        message:
          'Text to convert is required. Correct request is: ' +
          '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!targetCase) {
      errors.push({
        message:
          '"toCase" query param is required. Correct request is: ' +
          '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    } else if (!availableCases.includes(targetCase)) {
      errors.push({
        message:
          'This case is not supported. Available cases: ' +
          'SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (errors.length > 0) {
      res.writeHead(400, 'Bad request');

      return res.end(JSON.stringify({ errors }));
    }

    const result = convertToCase(originalText, targetCase);

    const response = {
      originalCase: result.originalCase,
      targetCase: targetCase,
      originalText: originalText,
      convertedText: result.convertedText,
    };

    res.writeHead(200, 'OK');
    res.end(JSON.stringify(response));
  });

  return server;
}

module.exports = { createServer };
