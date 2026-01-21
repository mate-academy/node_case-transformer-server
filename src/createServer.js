// Write code here
// Also, you can create additional files in the src folder

const { convertToCase } = require('./convertToCase/convertToCase');
// and import (require) them here
const createServer = () => {
  const http = require('http');
  const PORT = process.env.PORT || 3006;

  const server = http.createServer((req, res) => {
    const normalizedURL = new URL(req.url, `http://localhost:${PORT}`);

    const originalText = normalizedURL.pathname.split('/')[1];
    const toCase = normalizedURL.searchParams.get('toCase');
    const errors = [];

    if (!toCase) {
      // eslint-disable-next-line max-len
      errors.push({ message: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".' });
    }

    // eslint-disable-next-line max-len
    const invalidCase = toCase !== 'SNAKE' && toCase !== 'KEBAB' && toCase !== 'CAMEL' && toCase !== 'PASCAL' && toCase !== 'UPPER';

    if (invalidCase) {
      // eslint-disable-next-line max-len
      errors.push({ message: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.' });
    }

    if (!originalText) {
      // eslint-disable-next-line max-len
      errors.push({ message: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".' });
    }

    if (errors.length > 0) {
      res.writeHead(400, { 'Content-Type': 'application/json' });

      res.end(JSON.stringify({
        errors,
      }));

      return;
    }

    const { originalCase, convertedText } = convertToCase(originalText, toCase);

    res.writeHead(200, 'OK', { 'Content-Type': 'application/json' });

    res.end(JSON.stringify({
      originalCase,
      targetCase: toCase,
      originalText,
      convertedText,
    }));
  });

  return server;
};

module.exports = {
  createServer,
};
