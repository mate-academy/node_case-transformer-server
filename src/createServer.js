'use strict';

const http = require('http');
const { convertToCase } = require('./convertToCase');

const SUPPORTED_CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

const ERROR_MESSAGES = {
  MISSING_TEXT:
    'Text to convert is required. ' +
    'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  MISSING_TO_CASE:
    '"toCase" query param is required. ' +
    'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  UNSUPPORTED_CASE:
    'This case is not supported. ' +
    'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
};

function createServer() {
  return http.createServer((req, res) => {
    // Parse URL
    const [path, queryString] = req.url.split('?');

    // Extract text from path (remove leading '/')
    const textToConvert = path.substring(1);

    // Parse query params
    const params = new URLSearchParams(queryString || '');
    const toCase = params.get('toCase');

    // Validate request
    const errors = [];

    if (!textToConvert) {
      errors.push({
        message: ERROR_MESSAGES.MISSING_TEXT,
      });
    }

    if (!toCase) {
      errors.push({
        message: ERROR_MESSAGES.MISSING_TO_CASE,
      });
    } else if (!SUPPORTED_CASES.includes(toCase)) {
      errors.push({
        message: ERROR_MESSAGES.UNSUPPORTED_CASE,
      });
    }

    // Set JSON content type
    res.setHeader('Content-Type', 'application/json');

    // Handle validation errors
    if (errors.length > 0) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      res.end(JSON.stringify({ errors }));

      return;
    }

    // Convert text
    const result = convertToCase(textToConvert, toCase);

    // Send success response
    res.statusCode = 200;
    res.statusMessage = 'OK';

    res.end(
      JSON.stringify({
        originalCase: result.originalCase,
        targetCase: toCase,
        originalText: textToConvert,
        convertedText: result.convertedText,
      }),
    );
  });
}

module.exports = { createServer };
