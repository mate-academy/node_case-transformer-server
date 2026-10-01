// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here
const http = require('node:http');
const { convertToCase } = require('./convertToCase/convertToCase');

const CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function createServer() {
  return http.createServer((request, response) => {
    const [path, params] = request.url.split('?');

    const text = path.slice(1);
    const targetCase = new URLSearchParams(params).get('toCase');

    const errors = [];

    if (path === '/') {
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
    } else if (!CASES.includes(targetCase)) {
      errors.push({
        message:
          'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, ' +
          'PASCAL, UPPER.',
      });
    }

    response.setHeader('Content-Type', 'application/json');

    if (errors.length > 0) {
      response.statusCode = 400;

      response.end(JSON.stringify({ errors }));

      return;
    }

    const converted = convertToCase(text, targetCase);

    response.statusCode = 200;

    const responseBody = {
      originalCase: converted.originalCase,
      targetCase: targetCase,
      originalText: text,
      convertedText: converted.convertedText,
    };

    response.end(JSON.stringify(responseBody));
  });
}

module.exports = { createServer };
