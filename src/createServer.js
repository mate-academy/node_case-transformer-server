const http = require('http');

const { convertToCase } = require('./convertToCase');

function createServer() {
  const server = http.createServer((req, res) => {
    const possibleCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
    const errors = [];

    const parsedURL = new URL(req.url, `http://${req.headers.host}`);
    const originalText = parsedURL.pathname.slice(1);

    const normalizedURL = new URLSearchParams(req.url.split('?')[1]);
    const targetCase = normalizedURL.get('toCase');

    if (!originalText) {
      errors.push({
        message: 'Text to convert is required.'
          + ' Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!targetCase) {
      errors.push({
        message: '"toCase" query param is required.'
          + ' Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (targetCase && !(possibleCases.includes(targetCase))) {
      errors.push({
        message: 'This case is not supported.'
          + ' Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (errors.length) {
      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 404;
      res.statusText = 'Bad request';
      res.end(JSON.stringify({ errors }));

      return;
    }

    const { originalCase, convertedText } = convertToCase(
      originalText,
      targetCase,
    );

    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;
    res.statusText = 'OK';

    res.end(JSON.stringify({
      originalCase,
      targetCase,
      originalText,
      convertedText,
    }));
  });

  return server;
}

createServer();

module.exports = {
  createServer,
};
