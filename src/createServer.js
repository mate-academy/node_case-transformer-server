/* eslint-disable max-len */
const http = require('node:http');
const { convertToCase } = require('./convertToCase');

function createServer() {
  const server = http.createServer((req, res) => {
    const url = new URL(req.url, `http://localhost`);
    const params = url.searchParams;
    const toCase = params.get('toCase');
    const text = url.pathname.slice(1);
    const errors = [];
    const cases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

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
    } else if (!cases.includes(toCase.toUpperCase())) {
      errors.push({
        message:
          'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (errors.length > 0) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.write(JSON.stringify({ errors }));

      return res.end();
    }

    const convertedData = convertToCase(text, toCase.toUpperCase());

    const response = {
      originalText: text,
      targetCase: toCase,
      originalCase: convertedData.originalCase,
      convertedText: convertedData.convertedText,
    };

    res.writeHead(200, { 'content-type': 'application/json' });
    res.end(JSON.stringify(response));
  });

  return server;
}

module.exports = {
  createServer,
};
