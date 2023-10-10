/* eslint-disable max-len */
const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');

const allCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

const errorsMessages = {
  invalidCase: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
  noText: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  noCase: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
};

const createServer = () => {
  return http.createServer((req, res) => {
    const requestUrl = new URL(req.url, 'http://' + req.headers.host);

    const targetCase = requestUrl.searchParams.get('toCase');
    const originalText = requestUrl.pathname.slice(1);

    res.setHeader('Content-Type', 'application/json');

    const errors = [];

    if (!originalText) {
      errors.push({
        message: errorsMessages.noText,
      });
    }

    if (!targetCase) {
      errors.push({
        message: errorsMessages.noCase,
      });
    }

    if (targetCase && !allCases.includes(targetCase)) {
      errors.push({
        message: errorsMessages.invalidCase,
      });
    }

    if (errors.length) {
      res.write(JSON.stringify({ errors }));
      res.statusCode = 400;

      res.end();

      return;
    }

    const { originalCase, convertedText } = convertToCase(originalText, targetCase);

    res.statusCode = 200;

    res.write(JSON.stringify({
      originalCase,
      targetCase,
      originalText,
      convertedText,
    }));

    res.end();
  });
};

module.exports = { createServer };
