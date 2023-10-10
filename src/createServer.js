// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here
'use strict';

const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');
const { validateRequest } = require('./validator');

function createServer() {
  const server = http.createServer((req, res) => {
    const url = new URL(req.url, 'http://localhost:5700');

    res.setHeader('Content-Type', 'application/json');

    const textFromUrl = url.pathname.slice(1);
    const caseFromUrl = url.searchParams.get('toCase');

    const sendJsonResponse = (response, statusCode, data) => {
      response.writeHead(statusCode);
      response.end(JSON.stringify(data));
    };

    const errors = validateRequest(textFromUrl, caseFromUrl);

    if (errors.length) {
      sendJsonResponse(res, 400, { errors });

      return;
    }

    const { originalCase, convertedText } = convertToCase(
      textFromUrl,
      caseFromUrl,
    );

    const result = {
      originalCase,
      targetCase: caseFromUrl,
      originalText: textFromUrl,
      convertedText,
    };

    sendJsonResponse(res, 200, result);
  });

  return server;
}

module.exports = { createServer };
