/* eslint-disable no-console */
// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here
const http = require('http');
const { convertToCase } = require('./convertToCase');

function createServer() {
  const server = http.createServer((req, res) => {
    const normalizedUrl = new URL(req.url, `http://${req.headers.host}`);
    const text = normalizedUrl.pathname.slice(1);
    const toCase = normalizedUrl.searchParams.get('toCase');
    const errors = [];
    const toCaseCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

    if (!text) {
      const message =
        'Text to convert is required. Correct request is: ' +
        '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';

      errors.push({ message });
    }

    if (!toCase) {
      const message =
        '"toCase" query param is required. Correct request is: ' +
        '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';

      errors.push({ message });
    } else if (!toCaseCases.includes(toCase)) {
      const message =
        'This case is not supported. Available cases: ' +
        'SNAKE, KEBAB, CAMEL, PASCAL, UPPER.';

      errors.push({ message });
    }

    if (errors.length > 0) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ errors }));

      return;
    }

    const { originalCase, convertedText } = convertToCase(text, toCase);

    res.writeHead(200, { 'Content-Type': 'application/json' });

    res.end(
      JSON.stringify({
        originalCase,
        convertedText,
        targetCase: toCase,
        originalText: text,
      }),
    );
  });

  return server;
}

module.exports = {
  createServer,
};
