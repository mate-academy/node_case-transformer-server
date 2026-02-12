/* eslint-disable max-len */
const http = require('node:http');
const { convertToCase } = require('./convertToCase');

function createServer() {
  const server = http.createServer((req, res) => {
    const url = new URL(req.url || '', `http://${req.headers.host}`);
    const text = url.pathname.slice(1);
    const toCase = url.searchParams.get('toCase');

    const cases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
    const errors = [];

    res.setHeader('Content-Type', 'application/json');

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
    }

    if (toCase && !cases.includes(toCase)) {
      errors.push({
        message:
          'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (errors.length) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';

      return res.end(JSON.stringify({ errors }));
    }

    const result = convertToCase(text, toCase);

    const body = {
      originalCase: result.originalCase,
      targetCase: toCase,
      originalText: text,
      convertedText: result.convertedText,
    };

    res.statusCode = 200;
    res.end(JSON.stringify(body));
  });

  return server;
}

module.exports = {
  createServer,
};
