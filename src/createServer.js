// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here
const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');

const createServer = () => {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const normalizedUrl = new URL(req.url, `http://${req.headers.host}`);
    const supportedCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
    const text = normalizedUrl.pathname.slice(1);
    const toCase = normalizedUrl.searchParams.get('toCase');
    const errors = [];

    if (!text) {
      errors.push({ message:
        'Text to convert is required. Correct request is: '
        + '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".' });
    }

    if (!toCase) {
      errors.push({ message: '"toCase" query param is required. '
      + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".' });

      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      res.end(JSON.stringify({ errors }));

      return;
    }

    if (!supportedCases.includes(toCase)) {
      errors.push({ message: 'This case is not supported. '
      + 'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.' });
    }

    if (errors.length === 0 && text) {
      const result = convertToCase(text, toCase);

      res.statusCode = 200;

      res.end(JSON.stringify({
        originalCase: result.originalCase,
        targetCase: toCase.toUpperCase(),
        originalText: text,
        convertedText: result.convertedText,
      }));
    } else {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      res.end(JSON.stringify({ errors }));
    }
  });

  return server;
};

module.exports = { createServer };
