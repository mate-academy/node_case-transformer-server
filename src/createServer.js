const http = require('http');
const { convertToCase } = require('./convertToCase');

const createServer = () => (
  http.createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);

    const textToConvert = url.pathname.slice(1);
    const toCase = url.search.split('=')[1];
    const cases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
    const errors = [];

    res.setHeader('Content-type', 'application/json');

    if (!textToConvert) {
      errors.push({
        message: 'Text to convert is required. Correct request is:'
        + ' "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!toCase) {
      errors.push({
        message: '"toCase" query param is required. Correct request is:'
        + ' "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!cases.includes(toCase) && toCase) {
      errors.push({
        message: 'This case is not supported. Available cases:'
        + ' SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (errors.length) {
      res.statusCode = 400;
      res.statusText = 'Bad request';

      res.end(JSON.stringify({ errors }));

      return;
    }

    const result = convertToCase(textToConvert, toCase);

    res.statusCode = 200;

    res.end(JSON.stringify({
      originalCase: result.originalCase,
      targetCase: toCase,
      originalText: textToConvert,
      convertedText: result.convertedText,
    }));
  })
);

module.exports = { createServer };
