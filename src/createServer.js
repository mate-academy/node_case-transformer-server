/* eslint-disable max-len */
const http = require('http');
const { convertToCase } = require('./convertToCase');

function createServer() {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const bodyError = {};

    bodyError.errors = [];

    const [originalText, query] = req.url.slice(1).split('?');
    const params = new URLSearchParams(query);
    const targetCase = params.get('toCase');

    if (!originalText) {
      bodyError.errors.push({
        message: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!targetCase) {
      bodyError.errors.push({
        message: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (targetCase) {
      try {
        convertToCase(originalText, targetCase);
      } catch (err) {
        bodyError.errors.push({
          message: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
        });
      }
    }

    if (bodyError.errors.length) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      res.end(JSON.stringify(bodyError));
    } else {
      res.statusCode = 200;
      res.statusMessage = 'OK';

      const {
        originalCase,
        convertedText,
      } = convertToCase(originalText, targetCase);

      const response = {
        originalCase,
        targetCase,
        originalText,
        convertedText,
      };

      res.end(JSON.stringify(response));
    }
  });

  return server;
}

module.exports = {
  createServer,
};
