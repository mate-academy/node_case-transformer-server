// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here

const http = require('node:http');
const { convertToCase } = require('./convertToCase/convertToCase');

const CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
const FORMAT = '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>"';

function createServer() {
  return http.createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const text = url.pathname.slice(1);
    const toCase = url.searchParams.get('toCase');
    const errors = [];

    if (!text) {
      errors.push({
        message: `Text to convert is required. Correct request is: ${FORMAT}.`,
      });
    }

    if (!toCase) {
      errors.push({
        message: `"toCase" query param is required. Correct request is: ${FORMAT}.`,
      });
    } else if (!CASES.includes(toCase)) {
      errors.push({
        message:
          'This case is not supported. Available cases: ' +
          'SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    res.setHeader('Content-Type', 'application/json');

    if (errors.length) {
      res.statusCode = 400;
      res.statusMessage = 'Bad Request';
      res.end(JSON.stringify({ errors }));

      return;
    }

    const { originalCase, convertedText } = convertToCase(text, toCase);

    res.statusCode = 200;
    res.statusMessage = 'OK';

    res.end(
      JSON.stringify({
        originalCase,
        targetCase: toCase,
        originalText: text,
        convertedText,
      }),
    );
  });
}

module.exports = {
  createServer,
};
