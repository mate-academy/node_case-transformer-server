/* eslint-disable max-len */
const http = require('http');
const { convertToCase } = require('./convertToCase');

const createServer = () => {
  const server = http.createServer((req, res) => {
    const normalizedUrl = new URL(req.url, `http://${req.headers.host}`);

    const cases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

    const originalText = normalizedUrl.pathname.slice(1);
    const targetCase = normalizedUrl.searchParams.get('toCase');

    const response = {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
      body: {},
    };

    if (!originalText || !targetCase || !cases.includes(targetCase)) {
      const errors = [];

      if (!originalText) {
        errors.push({ message: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".' });
      }

      if (!targetCase) {
        errors.push({ message: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".' });
      } else if (!cases.includes(targetCase)) {
        errors.push({ message: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.' });
      }

      response.status = 400;
      response.body.errors = errors;
    } else {
      response.body = {
        originalText,
        targetCase,
        ...convertToCase(originalText, targetCase),
      };
    }

    res.writeHead(response.status, response.headers);
    res.end(JSON.stringify(response.body));
  });

  return server;
};

module.exports = { createServer };
