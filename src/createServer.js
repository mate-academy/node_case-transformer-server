/* eslint-disable max-len */
const http = require('http');
const { convertToCase } = require('./convertToCase');

function createServer() {
  return http.createServer((req, res) => {
    const [pathPart, queryString] = req.url.split('?');

    const text =
      pathPart && pathPart.startsWith('/') ? pathPart.slice(1) : pathPart || '';
    const params = new URLSearchParams(queryString);
    const toCase = params.get('toCase');

    const allowedList = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
    const errors = [];

    if (text === '' || text === undefined) {
      errors.push({
        message:
          'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (toCase === null) {
      errors.push({
        message:
          '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (toCase && !allowedList.includes(toCase)) {
      errors.push({
        message:
          'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (errors.length > 0) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ errors }));
    }

    if (errors.length === 0) {
      const { originalCase, convertedText } = convertToCase(text, toCase);

      const response = {
        originalCase,
        targetCase: toCase,
        originalText: text,
        convertedText,
      };

      res.statusCode = 200;
      res.statusMessage = 'OK';
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(response));
    }
  });
}

module.exports = {
  createServer,
};
