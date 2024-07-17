// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here
const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');
const { toCheckErrors } = require('./toCheckErrors.js');

function createServer() {
  return http.createServer((req, res) => {
    const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
    const textToConvert = parsedUrl.pathname.slice(1);
    const toCase = parsedUrl.searchParams.get('toCase');
    const checkRequest = toCheckErrors(toCase, textToConvert);

    switch (checkRequest) {
      case 'empty all':
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 400;

        res.end(
          JSON.stringify({
            errors: [
              {
                message:
                  'Text to convert is required. Correct request is:' +
                  ' "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
              },
              {
                message:
                  '"toCase" query param is required. Correct request is: ' +
                  '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
              },
            ],
          }),
        );
        break;
      case 'no text && wrong case':
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 400;

        res.end(
          JSON.stringify({
            errors: [
              {
                message:
                  'Text to convert is required. Correct request is:' +
                  ' "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
              },
              {
                message:
                  'This case is not supported. Available cases: ' +
                  'SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
              },
            ],
          }),
        );
        break;
      case 'no text':
        res.end(
          createErrorResponse(
            'Text to convert is required. Correct request is: ' +
              '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
            res,
          ),
        );
        break;
      case 'not type':
        res.end(
          createErrorResponse(
            '"toCase" query param is required. Correct request is: ' +
              '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
            res,
          ),
        );
        break;
      case 'wrong case':
        res.end(
          createErrorResponse(
            'This case is not supported. Available cases: ' +
              'SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
            res,
          ),
        );
        break;
      case 'correct':
        const result = convertToCase(textToConvert, toCase);

        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 200;

        res.end(
          JSON.stringify({
            originalCase: result.originalCase,
            targetCase: toCase,
            originalText: textToConvert,
            convertedText: result.convertedText,
          }),
        );
    }
  });
}

const createErrorResponse = (message, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 400;

  return JSON.stringify({
    errors: [
      {
        message: message,
      },
    ],
  });
};

module.exports = { createServer };
