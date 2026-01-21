// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here

const http = require('http');
const { validateUrl } = require('./validateUrl');
const { createSuccessPayload } = require('./createSuccessPayload');

function createServer() {
  const server = http.createServer((req, res) => {
    const urlValidation = validateUrl(req.url);

    res.setHeader('Content-Type', 'application/json');

    if (urlValidation.correct) {
      respondWithSuccess(res, req.url);
    } else {
      respondWithError(res, urlValidation.messages);
    }
  });

  return server;
}

function respondWithSuccess(res, url) {
  res.statusCode = 200;
  res.statusMessage = 'OK';

  const payload = createSuccessPayload(url);

  res.end(JSON.stringify(payload));
}

function respondWithError(res, messages) {
  res.statusCode = 400;
  res.statusMessage = 'Bad request';

  const payload = {
    errors: [...messages].map((el) => {
      return { message: el };
    }),
  };

  res.end(JSON.stringify(payload));
}

module.exports = { createServer };
