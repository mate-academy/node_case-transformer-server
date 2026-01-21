/* eslint-disable */
const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');

function createServer() {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const fileName = new URL(req.url, `http://${req.headers.host}`);
    const originalText = fileName.pathname.slice(1);
    const targetCase = fileName.searchParams.get('toCase');
    const errors = [];
    const availableCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

    if (!originalText) {
      errors.push({
        message:
          'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!targetCase) {
      errors.push({
        message:
          '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (targetCase && !availableCases.includes(targetCase)) {
      errors.push({
        message: `This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.`,
      });
    }

    if (errors.length > 0) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      res.end(JSON.stringify({ errors }));
    } else {
      const { originalCase, convertedText } = convertToCase(
        originalText,
        targetCase,
      );

      const responseBody = JSON.stringify({
        originalCase,
        targetCase,
        originalText,
        convertedText,
      });

      res.statusCode = 200;
      res.statusMessage = 'OK';
      res.end(responseBody);
    }
  });

  return server;
}

module.exports = {
  createServer,
};
