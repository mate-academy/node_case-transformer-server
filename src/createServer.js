'use strict';

const http = require('http');
const { convertToCase } = require('./convertToCase');

const SUPPORTED_CASES = ['SNAKE', 'CAMEL', 'PASCAL', 'KEBAB', 'UPPER'];

const CORRECT_REQUEST =
  'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';

const TEXT_REQUIRED_ERROR = 'Text to convert is required. ' + CORRECT_REQUEST;

const TO_CASE_REQUIRED_ERROR =
  '"toCase" query param is required. ' + CORRECT_REQUEST;

const INVALID_CASE_ERROR =
  'This case is not supported. Available cases: ' +
  'SNAKE, KEBAB, CAMEL, PASCAL, UPPER.';

function createServer() {
  return http.createServer((req, res) => {
    const url = new URL(req.url, 'http://localhost');

    const text = url.pathname.slice(1);
    const toCase = url.searchParams.get('toCase');

    const errors = [];

    if (!text) {
      errors.push({
        message: TEXT_REQUIRED_ERROR,
      });
    }

    if (!toCase) {
      errors.push({
        message: TO_CASE_REQUIRED_ERROR,
      });
    } else if (!SUPPORTED_CASES.includes(toCase)) {
      errors.push({
        message: INVALID_CASE_ERROR,
      });
    }

    if (errors.length > 0) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ errors }));

      return;
    }

    const result = convertToCase(text, toCase);

    res.statusCode = 200;
    res.statusMessage = 'OK';
    res.setHeader('Content-Type', 'application/json');

    res.end(
      JSON.stringify({
        originalCase: result.originalCase,
        targetCase: toCase,
        originalText: text,
        convertedText: result.convertedText,
      }),
    );
  });
}

module.exports = { createServer };
