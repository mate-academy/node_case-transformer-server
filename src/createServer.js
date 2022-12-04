// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here

const http = require('http');
const { convertToCase } = require('./convertToCase');
const { getError } = require('./getError');

function createServer() {
  const server = http.createServer((req, resp) => {
    const responseError = getError(req);

    resp.setHeader('Content-Type', 'application/json');

    if (responseError.errors.length > 0) {
      resp.statusCode = 404;
      resp.statusMessage = 'Bad request';
      resp.end(JSON.stringify(responseError));
    }

    if (responseError.errors.length === 0) {
      const requestPartsArr = req.url.split('?');
      const text = requestPartsArr[0].slice(1);
      const params = new URLSearchParams(requestPartsArr[1]);
      const toCase = params.get('toCase');

      const { originalCase, convertedText } = convertToCase(text, toCase);

      const response = {
        originalCase,
        targetCase: toCase,
        originalText: text,
        convertedText,
      };

      resp.statusCode = 200;
      resp.statusMessage = 'OK';
      resp.end(JSON.stringify(response));
    }
  });

  return server;
};

module.exports = {
  createServer,
};
