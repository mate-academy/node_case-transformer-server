/* eslint-disable max-len */
const http = require('node:http');
const { convertToCase } = require('./convertToCase/convertToCase');

function createServer() {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    if (req.method !== 'GET') {
      res.statusCode = 404;
      res.end(JSON.stringify({ message: 'Not Found' }));

      return;
    }

    const [path, queryString = ''] = req.url.split('?');
    const textToConvert = path.slice(1);
    const params = new URLSearchParams(queryString);
    const toCase = params.get('toCase');

    const errors = [];

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
    }

    const supportedCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

    if (toCase && !supportedCases.includes(toCase)) {
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

    const result = convertToCase(textToConvert, toCase);
    const response = {
      originalCase: result.originalCase,
      targetCase: toCase,
      originalText: textToConvert,
      convertedText: result.convertedText,
    };

    res.statusCode = 200;
    res.statusMessage = 'OK';
    res.end(JSON.stringify(response));
  });

  return server;
}

module.exports = {
  createServer,
};
