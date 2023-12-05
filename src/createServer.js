/* eslint-disable max-len */
/* eslint-disable no-console */
const { convertToCase } = require('./convertToCase');
const http = require('http');

function createServer() {
  const server = http.createServer((req, res) => {
    const myUrl = new URL(req.url, 'http://localhost:5700');
    const originalText = myUrl.pathname.slice(1);
    const targetCase = myUrl.searchParams.get('toCase');

    console.log(originalText);
    console.log(targetCase);

    const errors = [];

    if (!originalText) {
      errors.push({
        message: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!targetCase) {
      errors.push({
        message: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    } else {
      const supportedCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

      if (!supportedCases.includes(targetCase.toUpperCase())) {
        errors.push({
          message: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
        });
      }
    }

    if (errors.length > 0) {
      res.statusText = 'Bad request';
      res.writeHead(400, { 'Content-Type': 'application/json' });

      return res.end(JSON.stringify({ errors }));
    }

    const convertedResult = convertToCase(targetCase, originalText);

    const { originalCase, convertedText } = convertedResult;

    const data = {
      originalCase,
      targetCase,
      originalText,
      convertedText,
    };

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
  });

  return server;
}

module.exports = {
  createServer,
};
