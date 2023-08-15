/* eslint-disable max-len */

const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');
const { createErrorResponse, createSuccessResponse } = require('./responseHepler');
const { getValidationErrors } = require('./validationHelper');

const createServer = () => http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json');

  const normalizedURL = new URL(req.url, `http://${req.headers.host}`);
  const textToConvert = normalizedURL.pathname.slice(1);
  const toCase = normalizedURL.searchParams.get('toCase');

  const errors = getValidationErrors(textToConvert, toCase);

  if (errors.length > 0) {
    res.statusCode = 400;
    res.statusMessage = 'Bad request';
    res.end(JSON.stringify(createErrorResponse(errors)));

    return;
  }

  const { originalCase, convertedText } = convertToCase(textToConvert, toCase);

  res.statusCode = 200;
  res.statusMessage = 'OK';
  res.end(JSON.stringify(createSuccessResponse(originalCase, toCase, textToConvert, convertedText)));
});

module.exports = {
  createServer,
};
