// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here
const http = require('http');

const { convertToCase } = require('./convertToCase');

function createServer() {
  return http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const normolizedURL = new URL(
      req.url,
      `http://${req.headers.host || 'localhost'}`,
    );

    const textToConvert = normolizedURL.pathname.replace(/^\/+|\/+$/g, '');
    const toCase = normolizedURL.searchParams.get('toCase');
    const availableCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

    const currentErrors = [];

    if (textToConvert === '') {
      currentErrors.push({
        message:
          // eslint-disable-next-line max-len
          'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!toCase) {
      currentErrors.push({
        message:
          // eslint-disable-next-line max-len
          '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    } else if (!availableCases.includes(toCase)) {
      currentErrors.push({
        message:
          // eslint-disable-next-line max-len
          'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (currentErrors.length > 0) {
      res.statusCode = 400;

      return res.end(JSON.stringify({ errors: currentErrors }));
    }

    const data = convertToCase(textToConvert, toCase);

    const returnedObj = {
      originalCase: data.originalCase,
      targetCase: toCase,
      originalText: textToConvert,
      convertedText: data.convertedText,
    };

    res.statusCode = 200;
    res.statusMessage = 'OK';
    res.end(JSON.stringify(returnedObj));
  });
}

module.exports = {
  createServer,
};
