/* eslint-disable max-len */
const http = require('http');
const { convertToCase } = require('./convertToCase');

const createServer = () => {
  const availableCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const url = req.url.split('?');

    const originalText = url[0].slice(1);

    const params = new URLSearchParams(url[1]);
    const targetCase = params.get('toCase');

    if (!originalText || !targetCase || !availableCases.includes(targetCase)) {
      const errorResponse = {
        errors: [],
      };

      if (!originalText) {
        errorResponse.errors.push({
          message: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
        });
      };

      if (!targetCase) {
        errorResponse.errors.push({
          message: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
        });
      } else if (!availableCases.includes(targetCase)) {
        errorResponse.errors.push({
          message: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
        });
      }

      res.statusCode = 400;
      res.statusMessage = 'Bad request';

      return res.end(JSON.stringify(errorResponse));
    };

    const { originalCase, convertedText } = convertToCase(originalText, targetCase);

    const response = {
      originalCase,
      targetCase,
      originalText,
      convertedText,
    };

    res.statusCode = 200;
    res.statusMessage = 'OK';
    res.end(JSON.stringify(response));
  });

  return server;
};

module.exports = {
  createServer,
};
