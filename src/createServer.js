// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here
const http = require('http');
const convertToCase = require('./convertToCase');

function createServer() {
  const url = require('url');
  const server = http.createServer((req, res) => {
    const parsedUrl = url.URL(req.url);
    const queryParams = new URLSearchParams(parsedUrl.search);
    const textToConvert = queryParams.get('text');
    const targetCase = queryParams.get('toCase');

    if (!textToConvert) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
/* eslint-disable */
      res.end(JSON.stringify({
        errors: [{ message: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>"' }],
      }));

      return;
    }

    if (!targetCase) {
      res.writeHead(400, { 'Content-Type': 'application/json' });

      res.end(JSON.stringify({
        errors: [{ message: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>"' }],
      }));

      return;
    }

    const validCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

    if (!validCases.includes(targetCase)) {
      res.writeHead(400, { 'Content-Type': 'application/json' });

      res.end(JSON.stringify({
        errors: [{ message: 'Ten przypadek nie jest obsługiwany. Dostępne przypadki: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.' }],
      }));

      return;
    }

    const convertedText = convertToCase(targetCase, textToConvert);

    res.writeHead(200, { 'Content-Type': 'application/json' });

    res.end(JSON.stringify({
      originalCase: targetCase,
      targetCase: targetCase,
      originalText: textToConvert,
      convertedText: convertedText,
    }));
  });

  return server;
}

module.exports = createServer;
