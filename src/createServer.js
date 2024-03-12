/* eslint-disable max-len */
const http = require('http');
const { convertToCase } = require('./convertToCase');

function createServer() {
  const server = http.createServer((req, res) => {
    res.setHeader('content-type', 'application/json');

    const [url, queryString] = req.url.split('?');
    const params = new URLSearchParams(queryString || '');

    const text = url.replace(/^\//, '');
    const toCase = params.get('toCase');

    const errors = [];

    if (!toCase) {
      errors.push({
        message: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!text) {
      errors.push({
        message: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'].includes(toCase)) {
      errors.push({
        message: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (errors.length > 0) {
      res.writeHead(400, 'Bad Request');
      res.end(JSON.stringify({ errors }));

      return;
    }

    const result = convertToCase(text, toCase);

    if (!result || !result.originalCase || !result.convertedText) {
      res.writeHead(500, 'Internal Server Error');
      res.end(JSON.stringify({ error: 'Internal Server Error' }));

      return;
    }

    res.writeHead(200, 'OK');

    const responseBody = {
      originalCase: result.originalCase,
      targetCase: toCase,
      originalText: text,
      convertedText: result.convertedText,
    };

    res.end(JSON.stringify(responseBody));
  });

  return server;
}

module.exports = {
  createServer,
};
