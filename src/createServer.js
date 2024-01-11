/* eslint-disable max-len */
const http = require('http');
const { convertToCase } = require('./convertToCase');
const { errorResponse } = require('./helpers/errorResponse');
const { availableCases } = require('./consts/availableCases');

function createServer() {
  return http.createServer((req, res) => {
    res.setHeader('Content-Type', ' application/json');

    const {
      pathname,
      searchParams,
    } = new URL(req.url, 'http://localhost:5700/');

    const text = pathname.slice(1).trim();
    const toCase = searchParams.get('toCase')?.toUpperCase();
    const isValidCase = availableCases.includes(toCase);

    if (!text || !isValidCase) {
      const errors = [];

      if (!text) {
        errors.push('Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".');
      }

      if (toCase && !isValidCase) {
        errors.push('This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.');
      }

      if (!toCase) {
        errors.push('"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".');
      }

      errorResponse(res, errors);

      return;
    }

    try {
      const {
        originalCase,
        convertedText,
      } = convertToCase(text, toCase);

      res.statusCode = 200;
      res.statusMessage = 'OK';

      res.end(JSON.stringify({
        originalCase,
        targetCase: toCase,
        originalText: text,
        convertedText,
      }));
    } catch (error) {
      errorResponse(res, 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.');
    }
  });
}

module.exports = {
  createServer,
};
