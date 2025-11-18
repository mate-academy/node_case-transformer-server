// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here
const http = require('http');
const { convertText } = require('./convertToCase');

function createServer() {
  return http.createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const text = url.pathname.slice(1); // remove leading slash
    const toCase = url.searchParams.get('toCase');

    const errors = [];

    if (!text) {
      errors.push({
        message: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    const supportedCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

    if (!toCase) {
      errors.push({
        message: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    } else if (!supportedCases.includes(toCase)) {
      errors.push({
        message: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    res.setHeader('Content-Type', 'application/json');

    if (errors.length) {
      res.statusCode = 400;
      res.end(JSON.stringify({ errors }));
    } else {
      const convertedText = convertText(text, toCase);

      res.statusCode = 200;
      res.end(
        JSON.stringify({
          originalText: text,
          originalCase: detectCase(text),
          targetCase: toCase,
          convertedText,
          message: 'Hello, World!',
        })
      );
    }
  });
}

const { detectCase } = require('./convertToCase');

module.exports = { createServer };
