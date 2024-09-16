// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here
const { convertToCase } = require('./convertToCase');
const http = require('http');

function createServer() {
  const server = http.createServer((request, response) => {
    const supportedCases = [
      'SNAKE',
      'KEBAB',
      'CAMEL',
      'PASCAL',
      'UPPER',
    ];
    const [pathName, query] = request.url.split('?');
    const params = new URLSearchParams(query);
    const toCase = params.get('toCase');
    const textToBeConverted = pathName.slice(1);
    const errors = [];

    if (!toCase) {
      errors.push({
        message: '"toCase" query param is required.'
          + ' Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!supportedCases.includes(toCase) && toCase) {
      errors.push({
        message: 'This case is not supported.'
          + ' Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (!textToBeConverted) {
      errors.push({
        message: 'Text to convert is required.'
          + ' Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (errors.length > 0) {
      response.writeHead(400, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ errors }));
    } else {
      const result = convertToCase(textToBeConverted, toCase);
      const message = {
        originalCase: result.originalCase,
        targetCase: toCase,
        originalText: textToBeConverted,
        convertedText: result.convertedText,
      };

      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify(message));
    }
  });

  return server;
}

module.exports = {
  createServer,
};
