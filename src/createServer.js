// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here
const http = require('http');
const { convertToCase } = require('./convertToCase');

function createServer() {
  return http.createServer((req, res) => {
    const normalizedUrl = new URL(req.url, `http://${req.headers.host}`);
    const errors = [];
    const textToConvert = normalizedUrl.pathname.slice(1);
    const targetCase = normalizedUrl.searchParams.get('toCase');

    console.log(errors);

    if (!targetCase) {
      errors.push(
        '"toCase" query param is required. Correct request is:'
          + '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      );
    }

    if (!textToConvert) {
      errors.push(
        {
          message: 'Text to convert is required. Correct request is:'
          + '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
        },
      );
    }

    if (!textToConvert) {
      errors.push(
        {
          message: 'Text to convert is required. Correct request is:'
          + '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
        },
      );
    }

    const { originalCase, convertedText } = convertToCase(
      textToConvert,
      targetCase,
    );

    if (errors.length) {
      // res.writeHead(400, { 'Content-Type': 'application/json' });
      res.statusCode = 400;
      res.statusMessage = 'Bad request';

      res.end(
        JSON.stringify({
          errors,
        }),
      );
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });

      res.end(
        JSON.stringify({
          originalCase,
          targetCase,
          originalText: textToConvert,
          convertedText,
        }),
      );
    }
  });
}

module.exports = {
  createServer,
};
