/* eslint-disable max-len */
/* eslint-disable no-console */
const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');

const createServer = () => {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;
    res.statusMessage = 'OK';

    const SUPPORTED_CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
    const myURL = new URL(req.url, `http://${req.headers.host}`);
    const originalText = myURL.pathname.slice(1);
    const targetCase = myURL.searchParams.get('toCase');

    console.log(originalText, targetCase);

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
    } else if (!SUPPORTED_CASES.includes(targetCase)) {
      errors.push({
        message: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (errors.length > 0) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      res.end(JSON.stringify({ errors }));

      return;
    }

    const { originalCase, convertedText } = convertToCase(originalText, targetCase);

    res.end(JSON.stringify({
      originalCase, targetCase, originalText, convertedText,
    }));
  });

  return server;
};

module.exports = {
  createServer,
};
