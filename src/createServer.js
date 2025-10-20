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
      return sendResponse(res, 400, { errors });
    }

    const responseBody = createResponseBody(text, toCase);

    sendResponse(res, 200, responseBody);
  });

  return server;
};

module.exports = {
  createServer,
};
