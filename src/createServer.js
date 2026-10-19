/* eslint-disable max-len */
const http = require('http');

const { convertToCase } = require('./convertToCase');

function createServer() {
  return http.createServer((req, res) => {
    const [path, query] = req.url.split('?');
    const text = path.slice(1);
    const params = new URLSearchParams(query);
    const toCase = params.get('toCase');
    const validCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
    const errors = [];

    if (!text) {
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
    }

    if (toCase && !validCases.includes(toCase)) {
      errors.push({
        message:
          'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (errors.length > 0) {
      res.statusCode = 400;
      res.statusText = 'Bad request';
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ errors: errors }));

      return;
    }

    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;

    const result = convertToCase(text, toCase);
    const response = {
      originalCase: result.originalCase,
      targetCase: toCase,
      originalText: text,
      convertedText: result.convertedText,
    };

    res.end(JSON.stringify(response));
  });
}

module.exports = {
  createServer,
};
