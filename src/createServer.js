/* eslint-disable no-console */
const http = require('http');
const { convertToCase } = require('./convertToCase/index.js');

function createServer() {
  const server = http.createServer((req, res) => {
    const cases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
    const textToConvert = req.url.split('?')[0].slice(1);
    const params = new URLSearchParams(req.url.split('?')[1]);
    let toCase = params.get('toCase');
    const errors = [];

    if (toCase === null) {
      toCase = '';
    }

    if (!textToConvert) {
      errors.push({
        message: 'Text to convert is required.'
          + ' Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (toCase === '') {
      errors.push({
        message: '"toCase" query param is required.'
          + ' Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!cases.includes(toCase) && toCase !== '') {
      errors.push({
        message: 'This case is not supported.'
          + ' Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (errors.length) {
      res.writeHead(400, { 'Content-Type': 'application/json' });

      res.end(JSON.stringify({ errors }));

      return;
    }

    const convertedResult = convertToCase(textToConvert, toCase);

    res.writeHead(200, { 'Content-Type': 'application/json' });

    res.end(JSON.stringify({
      originalCase: convertedResult.originalCase,
      targetCase: toCase,
      originalText: textToConvert,
      convertedText: convertedResult.convertedText,
    }));
  });

  return server;
}

module.exports = { createServer };
