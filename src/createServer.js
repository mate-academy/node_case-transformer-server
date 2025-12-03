/* eslint-disable max-len */
// src/createServer.js
const http = require('http');
const url = require('url');
const { convertToCase } = require('./convertToCase/convertToCase');

const SUPPORTED_CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function createServer() {
  return http.createServer((req, res) => {
    const parsedUrl = new url.URL(req.url, `http://localhost`);
    const text = parsedUrl.pathname.slice(1);
    const caseMethod = parsedUrl.searchParams.get('toCase');

    const errors = [];

    if (!text) {
      errors.push({
        message:
          'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!caseMethod) {
      errors.push({
        message:
          '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    } else if (!SUPPORTED_CASES.includes(caseMethod.toUpperCase())) {
      errors.push({
        message:
          'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (errors.length > 0) {
      res.writeHead(400, 'Bad request', {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify({ errors }));

      return;
    }

    const result = convertToCase(text, caseMethod.toUpperCase());

    const responsePayload = {
      originalCase: result.originalCase,
      targetCase: caseMethod.toUpperCase(),
      originalText: text,
      convertedText: result.convertedText,
    };

    res.writeHead(200, 'OK', { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(responsePayload));
  });
}

module.exports = { createServer };
