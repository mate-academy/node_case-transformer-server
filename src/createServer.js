// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here
const http = require('http');
const { convertToCase } = require('./convertToCase');

function createServer() {
  const server = http.createServer((req, res) => {
    const normUrl = new URL(req.url, 'http://localhost:5700');
    const text = normUrl.pathname.slice(1);
    const toCase = normUrl.searchParams.get('toCase');
    const errorsArray = [];

    try {
      if (!text) {
        errorsArray.push({
          message:
            'Text to convert is required. Correct request is: ' +
            '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
        });
      }

      if (!toCase) {
        errorsArray.push({
          message:
            '"toCase" query param is required. Correct request is: ' +
            '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
        });
      }

      if (
        !['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'].includes(
          toCase.toUpperCase(),
        )
      ) {
        errorsArray.push({
          message:
            'This case is not supported. Available cases: ' +
            'SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
        });
      }

      if (errorsArray.length) {
        throw new Error('error');
      }

      const result = convertToCase(text, toCase);
      const response = {
        originalCase: result.originalCase,
        targetCase: toCase,
        originalText: text,
        convertedText: result.convertedText,
      };

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(response));
    } catch (error) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ errors: errorsArray }));
    }
  });

  return server;
}

module.exports = { createServer };
