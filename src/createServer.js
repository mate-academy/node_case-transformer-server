// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here
const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase.js');

function createServer() {
  const validCase = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

  const server = http.createServer((req, res) => {
    const [path, queryString] = req.url.split('?');
    const params = new URLSearchParams(queryString);

    const errors = {
      errors: [],
    };

    const text = path === '/' ? '' : path.slice(1);
    const toCase = params.get('toCase');

    if (!text) {
      errors.errors.push({
        message:
          'Text to convert is required. Correct request is: ' +
          '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!toCase) {
      errors.errors.push({
        message:
          '"toCase" query param is required. Correct request is: ' +
          '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    } else if (!validCase.includes(toCase)) {
      errors.errors.push({
        message:
          'This case is not supported. Available cases: ' +
          'SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (errors.errors.length > 0) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(errors));

      return;
    }

    try {
      const result = convertToCase(text, toCase);

      const body = {
        originalCase: result.originalCase,
        targetCase: toCase,
        convertedText: result.convertedText,
        originalText: text,
      };

      res.statusCode = 200;
      res.statusMessage = 'OK';
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(body));
    } catch (error) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ errors: [{ message: error.message }] }));
    }
  });

  return server;
}

module.exports = {
  createServer,
};
