/* eslint-disable max-len */
// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here
const http = require('node:http');
const { convertToCase } = require('./convertToCase');

const SUPPORTED_CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function sendJson(res, statusCode, statusMessage, payload) {
  res.statusCode = statusCode;
  res.statusMessage = statusMessage;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(payload));
}

function createServer() {
  return http.createServer((req, res) => {
    const [pathPart, queryString] = (req.url || '/').split('?');
    const textToConvert = decodeURIComponent(pathPart).slice(1);

    const params = new URLSearchParams(queryString || '');
    const toCase = params.get('toCase');

    const errors = [];

    if (!textToConvert) {
      errors.push({
        message:
          'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!toCase) {
      errors.push({
        message:
          '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    } else if (!SUPPORTED_CASES.includes(toCase)) {
      errors.push({
        message:
          'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (errors.length > 0) {
      return sendJson(res, 400, 'Bad request', { errors });
    }

    const { originalCase, convertedText } = convertToCase(
      textToConvert,
      toCase,
    );

    return sendJson(res, 200, 'OK', {
      originalCase,
      targetCase: toCase,
      originalText: textToConvert,
      convertedText,
    });
  });
}

module.exports = { createServer };
