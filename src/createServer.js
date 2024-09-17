/* eslint-disable no-console */
const http = require('http');
const { validateReq } = require('./validateReq');
const { prepareResponse } = require('./prepareResponse');
const { getUrlParams } = require('./getUrlParams');
const { sendResponse } = require('./sendResponse');

const createServer = () => {
  const server = http.createServer((req, res) => {
    const { textToConvert, caseToConvert } = getUrlParams(req);
    const validationResult = validateReq(textToConvert, caseToConvert);
    const responseBody = prepareResponse(textToConvert, caseToConvert);

    if (validationResult.errors.length === 0) {
      sendResponse(res, responseBody, 200, 'OK');
    } else {
      sendResponse(res, validationResult, 400, 'Bad request');
    }
  });

  return server;
};

module.exports = { createServer };
