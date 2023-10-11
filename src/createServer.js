// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here

const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');

const createServer = () => {
    const server = http.createServer((request, response) => {
    const normalizedUrl = new URL(request.url, `http://${request.headers.url}`);
    const text = request.url.split('?')[0].slice(1);
    const toCase = normalizedUrl.searchParams.get('toCase');
    const { originalCase, convertedText } = convertToCase(text, toCase);
    const cases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
    const errorMessages = {
      errors: [],
    };

    if (!text) {
      errorMessages.errors = [
        ...errorMessages.errors,
        {
          message: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
        }
      ];
    };

    if (!toCase) {
      errorMessages.errors = [
        ...errorMessages.errors,
        {
          message: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
        }
      ];
    };

    if (!cases.includes(toCase)) {
      errorMessages.errors = [
        ...errorMessages.errors,
        {
          message: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
        }
      ];
    };

    if (errorMessages.errors.length === 0) {
      response.setHeader('Content-Type', 'application/json');
      response.statusCode = 200;
      response.statusMessage = 'OK';

      response.end(JSON.stringify(
        {
          originalCase: originalCase,
          targetCase: toCase,
          originalText: text,
          convertedText: convertedText,
        }
      ));
    } else {
      response.statusCode = 400;
      response.end(JSON.stringify(errorMessages));
    }
  });

  return server;
};

module.exports = {
  createServer,
};
