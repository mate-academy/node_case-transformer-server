const http = require('node:http');
const { convertToCase } = require('./convertToCase');

function createServer() {
  return http.createServer((req, res) => {
    const queryList = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

    const myURL = new URL(req.url, 'http://localhost');
    const newSearchParams = new URLSearchParams(myURL.searchParams).get(
      'toCase',
    );

    const [rawPath] = req.url.split('?');
    const text = (rawPath || '').replace(new RegExp('^/+|/+$', 'g'), '');
    const errors = [];

    function errorRes(message) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ errors: [...message] }));
    }

    function sucRes(originalCase, targetCase, originalText, convertedText) {
      res.statusCode = 200;
      res.statusMessage = 'Ok';
      res.setHeader('Content-Type', 'application/json');

      res.end(
        JSON.stringify({
          originalCase: originalCase,
          targetCase: targetCase,
          originalText: originalText,
          convertedText: convertedText,
        }),
      );
    }

    if (text === '') {
      errors.push({
        message: `Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
      });
    }

    if (newSearchParams === null) {
      errors.push({
        message: `"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
      });
    }

    if (newSearchParams !== null && !queryList.includes(newSearchParams)) {
      errors.push({
        message: `This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.`,
      });
    }

    if (errors.length > 0) {
      errorRes(errors);
    } else {
      const { originalCase, convertedText } = convertToCase(
        text,
        newSearchParams,
      );

      sucRes(originalCase, newSearchParams, text, convertedText);
    }
  });
}

module.exports = { createServer };
