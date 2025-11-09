// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here

const http = require('http');
const { checkReq } = require('./checkReq');
const { getRequestParts } = require('./getRequestParts');
const { validateRequest } = require('./validateRequest');
const { createResponse } = require('./createResponse');

const createServer = () => {
  return http.createServer((req, res) => {
    const normalizedUrl = new URL(req.url, `http://${req.headers.host}`);

    if (checkReq(normalizedUrl, res)) {
      return;
    }

    const { wordsToConvert, toCase } = getRequestParts(normalizedUrl);

    const errors = validateRequest(wordsToConvert, toCase);

    if (errors.length === 0) {
      res.statusCode = 200;
      res.statusMessage = 'OK';
      res.setHeader('Content-Type', 'application/json');

      const response = createResponse({ wordsToConvert, toCase });

      res.end(response);
    } else {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      res.setHeader('Content-Type', 'application/json');

      const response = createResponse({ errors });

      res.end(response);
    }
  });
};

module.exports = {
  createServer,
};
