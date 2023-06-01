const http = require('http');
const { normalizeUrl } = require('./normalizeUrl');
const { checkErrors } = require('./checkErrors');
const { sendResponse } = require('./sendResponse');
const { createResponseBody } = require('./createResponseBody');

const createServer = () => {
  const server = http.createServer((req, res) => {
    const { text, toCase } = normalizeUrl(req);
    const errors = checkErrors(text, toCase);

    if (errors.length) {
      return sendResponse(res, 400, errors);
    }

    const responseBody = createResponseBody(text, toCase);

    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;
    res.end(JSON.stringify(responseBody));
  });

  return server;
};

module.exports = {
  createServer,
};
