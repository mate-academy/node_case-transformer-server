/* eslint-disable max-len */
const http = require('http');
const { convertToCase } = require('./convertToCase');
const SUPPORTED_CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function createServer() {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const errors = [];
    const [path, queryString] = req.url.split('?');
    const textToConvert =
      path && path !== '/' ? decodeURIComponent(path.slice(1)) : '';
    const params = new URLSearchParams(queryString || '');
    const toCase = params.get('toCase');

    if (!textToConvert) {
      errors.push({
        message:
          'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!toCase) {
      errors.push({
        message:
          '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    } else if (!SUPPORTED_CASES.includes(toCase)) {
      errors.push({
        message:
          'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (errors.length > 0) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      res.end(JSON.stringify({ errors }));

      return;
    }

    const { originalCase, convertedText } = convertToCase(
      toCase,
      textToConvert,
    );
    const response = {
      originalCase,
      targetCase: toCase,
      originalText: textToConvert,
      convertedText,
    };

    res.statusCode = 200;
    res.statusMessage = 'OK';
    res.end(JSON.stringify(response));
  });

  return server;
}
module.exports = { createServer };
