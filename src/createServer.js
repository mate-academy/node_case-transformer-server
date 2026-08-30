// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here
const { convertToCase } = require('./convertToCase/convertToCase.js');

const http = require('http');

const SUPPORTED_CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

const TEXT_ERROR =
  'Text to convert is required. Correct request is: ' +
  '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';
const TO_CASE_ERROR =
  '"toCase" query param is required. Correct request is: ' +
  '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';
const UNSUPPORTED_CASE_ERROR =
  'This case is not supported. Available cases: ' +
  'SNAKE, KEBAB, CAMEL, PASCAL, UPPER.';

function createServer() {
  const server = http.createServer((req, res) => {
    const parsedURL = new URL(req.url, 'http://localhost');
    const text = decodeURIComponent(parsedURL.pathname.substring(1));
    const toCase = parsedURL.searchParams.get('toCase');
    const errors = [];

    if (!text) {
      errors.push({ message: TEXT_ERROR });
    }

    if (!toCase) {
      errors.push({ message: TO_CASE_ERROR });
    } else if (!SUPPORTED_CASES.includes(toCase)) {
      errors.push({ message: UNSUPPORTED_CASE_ERROR });
    }

    res.setHeader('Content-Type', 'application/json');

    if (errors.length > 0) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';

      return res.end(JSON.stringify({ errors }));
    }

    const result = convertToCase(text, toCase);

    res.statusCode = 200;
    res.statusMessage = 'OK';

    res.end(
      JSON.stringify({
        ...result,
        targetCase: toCase,
        originalText: text,
      }),
    );
  });

  return server;
}

module.exports = { createServer };
