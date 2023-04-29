'use strick';

const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');

function createServer() {
  const server = http.createServer((req, res) => {
    const normalizedURL = new URL(req.url, `http://${req.headers.host}`);
    const params = normalizedURL.searchParams.get('toCase');
    const word = normalizedURL.pathname.slice(1);
    const listCaseName = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
    const errors = [];

    if (!params) {
      // eslint-disable-next-line max-len
      errors.push({ message: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".' });
    }

    if (!word) {
      // eslint-disable-next-line max-len
      errors.push({ message: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".' });
    }

    if (!listCaseName.includes(params)) {
      errors.push({
        // eslint-disable-next-line max-len
        message: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (errors.length) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ errors }));
    }

    if (!errors.length) {
      const result = convertToCase(word, params);

      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');

      res.end(JSON.stringify({
        originalCase: result.originalCase,
        targetCase: params,
        originalText: word,
        convertedText: result.convertedText,
      }));
    }
  });

  return server;
};

module.exports = { createServer };
