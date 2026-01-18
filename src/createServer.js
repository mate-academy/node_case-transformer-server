/* eslint-disable max-len */
// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here
const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');
const { validateRequestParams } = require('./validateRequestParams');
const { sendErrorResponse } = require('./sendErrorResponse');

function createServer() {
  const server = http.createServer((req, res) => {
    const searchUrl = new URL(req.url, `http://${req.headers.host}`);
    const targetCase = searchUrl.searchParams.get('toCase');
    const originalText = searchUrl.pathname.replace('/', '');

    const errors = validateRequestParams(originalText, targetCase);

    if (errors.length) {
      return sendErrorResponse(res, errors);
    }

    try {
      const { originalCase, convertedText } = convertToCase(
        originalText,
        targetCase.toUpperCase(),
      );

      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.statusMessage = 'OK';

      res.end(
        JSON.stringify({
          originalCase,
          targetCase,
          originalText,
          convertedText,
        }),
      );
    } catch (error) {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');

      res.end(
        JSON.stringify({
          errors: [{ message: error.message }],
        }),
      );
    }
  });

  return server;
}

module.exports = {
  createServer,
};
