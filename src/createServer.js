// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here
const http = require('http');
const { convertToCase } = require('./convertToCase');

function createServer() {
  return http.createServer((req, res) => {
    const url = new URL(req.url || '', `http://${req.headers.host}`);
    const textToConvert = url.pathname.slice(1);
    const params = new URLSearchParams(url.search);
    const toCase = params.get('toCase');

    res.setHeader('Content-Type', 'application/json');

    const errors = [];
    const supportedCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

    if (!textToConvert) {
      errors.push({
        message:
          'Text to convert is required. Correct request is:' +
          ' "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!toCase) {
      errors.push({
        message:
          '"toCase" query param is required. Correct request is:' +
          ' "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    } else if (!supportedCases.includes(toCase)) {
      errors.push({
        message:
          'This case is not supported.' +
          ' Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (errors.length > 0) {
      res.statusCode = 400;

      return res.end(
        JSON.stringify({
          errors,
        }),
      );
    }

    const { originalCase, convertedText } = convertToCase(
      textToConvert,
      toCase,
    );

    const responseData = {
      originalCase: originalCase,
      targetCase: toCase,
      originalText: textToConvert,
      convertedText: convertedText,
    };

    res.statusCode = 200;
    res.end(JSON.stringify(responseData));
  });
}

module.exports = {
  createServer,
};
