/* eslint-disable max-len */
const http = require('http');
const { convertToCase } = require('./convertToCase');

function createServer() {
  const server = http.createServer((req, res) => {
    const normalizedUrl = new URL(req.url, `http://${req.headers.host}/`);
    const originalText = normalizedUrl.pathname.slice(1);
    const targetCase = normalizedUrl.searchParams.get('toCase');
    const validCaseTypes = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

    res.setHeader('Content-Type', 'application/json');

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
    }

    if (targetCase && !validCaseTypes.includes(targetCase)) {
      errors.push({
        message: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (errors.length) {
      res.statusCode = 400;
      res.statusMessage = 'Bad Request';

      return res.end(JSON.stringify({ errors }));
    }

    res.statusCode = 200;
    res.statusMessage = 'OK';

    const { convertedText, originalCase } = convertToCase(originalText, targetCase);

    return res.end(JSON.stringify({
      originalCase,
      targetCase,
      originalText,
      convertedText,
    }));
  });

  return server;
}

module.exports = {
  createServer,
};
