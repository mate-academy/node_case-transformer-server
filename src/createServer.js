const http = require('http');
const { convertToCase } = require('./convertToCase');

function createServer() {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const validCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

    const normalizedURL = new URL(req.url, `http://${req.headers.host}`);
    const originalText = normalizedURL.pathname.slice(1);
    const targetCase = normalizedURL.searchParams.get('toCase');

    const errors = [];

    if (!originalText) {
      errors.push({
        message: 'Text to convert is required. Correct request is: '
        + '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!targetCase) {
      errors.push({
        message: '"toCase" query param is required. Correct request is: '
        + '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (targetCase && !validCases.includes(targetCase)) {
      errors.push({
        message: 'This case is not supported. Available cases: '
        + 'SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (errors.length) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';

      res.end(JSON.stringify({ errors }));

      return;
    }

    const {
      originalCase,
      convertedText,
    } = convertToCase(originalText, targetCase);

    const result = {
      originalCase,
      convertedText,
      originalText,
      targetCase,
    };

    res.statusCode = 200;
    res.statusMessage = 'OK';

    res.end(JSON.stringify(result));
  });

  return server;
}

module.exports = { createServer };
