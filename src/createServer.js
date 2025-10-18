/* eslint-disable no-console */
/* eslint-disable max-len */
const http = require('http');
const { availableCases } = require('./constants');
const { createError } = require('./services/createError');
const { convertToCase } = require('./convertToCase/convertToCase');

const MISSING_TO_CASE_ERROR = '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';
const MISSING_TEXT_ERROR = 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';
const NOT_SUPPORTED_CASE_ERROR = 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.';

const PROTOCOL = 'http';
const BAD_REQUEST_CODE = 400;
const OK_CODE = 200;

const createServer = () => (
  http.createServer(async(request, response) => {
    request.setEncoding('utf-8');
    response.setHeader('Content-Type', 'application/json');

    const errors = [];

    const base = `${PROTOCOL}://${request.headers.host}`;
    const url = new URL(request.url, base);
    const originalText = url.pathname?.slice(1);
    const targetCase = url.searchParams.get('toCase');

    if (!originalText) {
      errors.push(createError(MISSING_TEXT_ERROR));
    }

    if (!targetCase) {
      errors.push(createError(MISSING_TO_CASE_ERROR));
    }

    if (targetCase && !availableCases.includes(targetCase)) {
      errors.push(createError(NOT_SUPPORTED_CASE_ERROR));
    }

    if (errors.length) {
      response.statusCode = BAD_REQUEST_CODE;

      const errorsObj = {
        errors,
      };

      response.end(JSON.stringify(errorsObj));

      return;
    }

    const { originalCase, convertedText } = convertToCase(originalText, targetCase);

    const responseObj = {
      originalCase,
      targetCase,
      originalText,
      convertedText,
    };

    response.statusCode = OK_CODE;

    response.end(JSON.stringify(responseObj));
  })
);

module.exports = {
  createServer,
};
