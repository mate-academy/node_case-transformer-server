/* eslint-disable max-len */
/* eslint-disable no-console */
// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here
const http = require('http');
const { convertToCase } = require('./convertToCase');

const SUPPORTED_CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
const TEXT_REQUIRED_MESSAGE =
  'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';
const TO_CASE_REQUIRED_MESSAGE =
  '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';
const INVALID_CASE_MESSAGE =
  'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.';

function createServer(port) {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const requestUrl = new URL(req.url, `http://${req.headers.host}`);
    const requestPath = requestUrl.pathname;
    const queryParams = Object.fromEntries(requestUrl.searchParams);
    const textToConvert = requestPath.slice(1);
    const errors = [];

    if (!textToConvert) {
      errors.push({ message: TEXT_REQUIRED_MESSAGE });
    }

    if (Object.keys(queryParams).length === 0 || !queryParams.toCase) {
      errors.push({ message: TO_CASE_REQUIRED_MESSAGE });
    } else if (!SUPPORTED_CASES.includes(queryParams.toCase)) {
      errors.push({ message: INVALID_CASE_MESSAGE });
    }

    if (errors.length > 0) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      res.end(JSON.stringify({ errors }));

      return;
    }

    const { originalCase, convertedText } = convertToCase(
      textToConvert,
      queryParams.toCase,
    );

    res.statusCode = 200;
    res.statusMessage = 'OK';

    res.end(
      JSON.stringify({
        originalCase,
        targetCase: queryParams.toCase,
        originalText: textToConvert,
        convertedText,
      }),
    );
  });

  return server;
}

module.exports = { createServer };
