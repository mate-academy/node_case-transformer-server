const http = require('http');
const { convertToCase } = require('../src/convertToCase');

const createServer = () => {
  return http.createServer((req, res) => {
    const normalizedURL = new URL(req.url, `http://${req.headers.host}`);
    const convertText = normalizedURL.pathname.slice(1);
    const toCase = normalizedURL.search.split('=')[1];
    const cases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
    const errors = [];

    res.setHeader('Content-Type', 'application/json');

    if (!convertText) {
      errors.push({
        message: 'Text to convert is required. '
          + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    };

    if (!toCase) {
      errors.push({
        message: '"toCase" query param is required. '
          + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    };

    if (!cases.includes(toCase) && toCase) {
      errors.push({
        message: 'This case is not supported. '
          + 'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    };

    if (errors.length) {
      res.statusCode = 400;
      res.statusText = 'Bad request';

      res.end(JSON.stringify({ errors }));

      return;
    };

    const result = convertToCase(convertText, toCase);

    res.end(JSON.stringify({
      originalCase: result.originalCase,
      targetCase: toCase,
      originalText: convertText,
      convertedText: result.convertedText,
    }));
  });
};

module.exports = { createServer };
