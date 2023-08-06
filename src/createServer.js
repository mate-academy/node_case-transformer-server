/* eslint-disable no-console */
/* eslint-disable max-len */
const http = require('http');
const { checkCase } = require('./convertToCase/checkCase.js');
const { convertToCase } = require('./convertToCase/convertToCase.js');

const createServer = () => {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-type', 'application/json');

    if (req.url === '/favicon.ico') {
      return;
    };

    const url = new URL(req.url, `http://${req.headers.host}`);
    const originalText = url.pathname.slice(1);
    const targetCase = url.searchParams.get('toCase');

    console.log(originalText, targetCase);

    const isError = !targetCase || !originalText || !checkCase(targetCase);

    if (isError) {
      const errorResponse = {
        errors: [],
      };

      if (!originalText) {
        errorResponse.errors.push({
          message: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
        });
      }

      if (!targetCase) {
        errorResponse.errors.push({
          message: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
        });
      } else if (!checkCase(targetCase)) {
        errorResponse.errors.push({
          message: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
        });
      }
      res.statusCode = 400;
      res.statusMessage = 'Bad request';

      return res.end(JSON.stringify(errorResponse));
    }

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

createServer();

module.exports = { createServer };
