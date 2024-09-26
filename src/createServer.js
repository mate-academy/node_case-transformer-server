// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here
const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');

function createServer() {
  const server = http.createServer((req, res) => {
    const normalizedUrl = new URL(req.url, `http://${req.headers.host}`);

    const errors = [];

    const textToConvert = normalizedUrl.pathname.slice(1);

    const toCase = normalizedUrl.searchParams.get('toCase');

    const CASE_NAMES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

    if (!textToConvert) {
      errors.push({
        message: 'Text to convert is required.'
          + ' Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!toCase) {
      errors.push({
        message: '"toCase" query param is required.'
          + ' Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    } else if (!CASE_NAMES.includes(toCase)) {
      errors.push({
        message: 'This case is not supported.'
          + ' Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (errors.length) {
      res.writeHead(400, 'Bad request', {
        'Content-Type': 'application/json',
      });

      res.end(JSON.stringify({ errors }));
    } else {
      res.writeHead(200, 'OK', { 'Content-Type': 'application/json' });

      const {
        originalCase, convertedText,
      } = convertToCase(textToConvert, toCase);

      const resultObject = {
        originalCase,
        targetCase: toCase,
        originalText: textToConvert,
        convertedText,
      };

      res.end(JSON.stringify(resultObject));
    }
  });

  return server;
}

module.exports = {
  createServer,
};
