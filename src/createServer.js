/* eslint-disable max-len */
// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here

const { convertToCase } = require('./convertToCase');

const http = require('http');

function createServer() {
  const server = http.createServer((req, res) => {
    const errors = [];

    const url = new URL(req.url, `http://${req.headers.host}`);
    const text = url.pathname.slice(1); // Remove the leading slash
    const toCase = url.searchParams.get('toCase');

    if (!text) {
      errors.push({
        message:
          'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!toCase) {
      errors.push({
        message:
          '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    } else if (
      !['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'].includes(toCase)
    ) {
      errors.push({
        message:
          'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (errors.length > 0) {
      res.statusMessage = 'Bad request';
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ errors }));

      return;
    }

    const { originalCase, convertedText } = convertToCase(text, toCase);

    res.statusMessage = 'OK';
    res.writeHead(200, { 'Content-Type': 'application/json' });

    res.end(
      JSON.stringify({
        originalCase,
        targetCase: toCase,
        convertedText,
        originalText: text,
      }),
    );
  });

  return server;
}

module.exports = { createServer };
