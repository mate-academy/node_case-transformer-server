// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here
const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');
const { ERROR_MESSAGES, SUPPORTED_CASES } = require('./constants');

function createServer() {
  return http.createServer((request, response) => {
    const normalizedURL = new URL(request.url, `http://${request.headers.host}`);
    const originalText = normalizedURL.pathname.slice(1);
    const targetCase = normalizedURL.searchParams.get('toCase');

    let responseData = {};

    response.setHeader('content-type', 'application/json');

    const errors = [];

    if (originalText.length === 0) {
      errors.push({
        message: ERROR_MESSAGES.noTextToConvert,
      });
    }

    if (!targetCase) {
      errors.push({
        message: ERROR_MESSAGES.noCaseParam,
      });
    } else if (!SUPPORTED_CASES.includes(targetCase)) {
      errors.push({
        message: ERROR_MESSAGES.notSupportedCase,
      });
    }

    if (errors.length) {
      responseData = {
        errors,
      };

      response.statusCode = 400;
      response.statusMessage = 'Bad request';
    } else {
      const {
        originalCase,
        convertedText,
      } = convertToCase(originalText, targetCase);

      responseData = {
        originalCase,
        targetCase,
        originalText,
        convertedText,
      };
    }

    response.end(JSON.stringify(responseData));
  });
}

module.exports = { createServer };
