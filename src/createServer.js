/* eslint-disable max-len */
// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here
const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');

function createServer() {
  return http.createServer((req, res) => {
    const supportedCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

    const [pathPart, queryString] = req.url.split('?');
    const params = new URLSearchParams(queryString || '');
    const caseType = params.get('toCase');
    const textToConvert = pathPart ? decodeURIComponent(pathPart.slice(1)) : '';

    const errors = [];

    if (!textToConvert) {
      errors.push({
        message:
          'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!caseType) {
      errors.push({
        message:
          '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (caseType && !supportedCases.includes(caseType)) {
      errors.push({
        message:
          'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (errors.length > 0) {
      res.writeHead(400, 'Bad request', { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ errors }));

      return;
    }

    const result = convertToCase(textToConvert, caseType);

    res.writeHead(200, 'OK', { 'Content-Type': 'application/json' });

    res.end(
      JSON.stringify({
        ...result,
        targetCase: caseType,
        originalText: textToConvert,
      }),
    );
  });
}

module.exports = {
  createServer,
};
