// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here
const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');

const createServer = () => {
  return http.createServer((req, res) => {
    const [textUrl, queryString] = req.url.split('?');
    const params = new URLSearchParams(queryString);

    const toCase = params.get('toCase');
    const text = textUrl.slice(1);

    const errors = [];

    if (text.length === 0) {
      errors.push({
        message:
          'Text to convert is required. Correct request is: ' +
          '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (toCase === null) {
      errors.push({
        message:
          '"toCase" query param is required. Correct request is: ' +
          '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    const suportedCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

    if (toCase !== null && !suportedCases.includes(toCase)) {
      errors.push({
        message:
          'This case is not supported. Available cases: ' +
          'SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (errors.length > 0) {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');

      res.end(JSON.stringify({ errors }));
    } else {
      const result = convertToCase(text, toCase);

      res.statusCode = 200;
      res.statusMessage = 'Ok';
      res.setHeader('Content-Type', 'application/json');

      res.end(
        JSON.stringify({
          originalCase: result.originalCase,
          targetCase: toCase,
          originalText: text,
          convertedText: result.convertedText,
        }),
      );
    }
  });
};

module.exports = {
  createServer,
};
