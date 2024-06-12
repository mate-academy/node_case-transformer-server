const http = require('http');
const { validateRequire } = require('./validateRequire');
const { prepareResponseBody } = require('./prepareResponseBody');
const { getRequestData } = require('./getRequestData');
const { sendResponse } = require('./sendResponse');

const createServer = () => {
  const server = http.createServer((req, res) => {
    const [originalText, targetCase] = getRequestData(req);
    const errors = validateRequire(originalText, targetCase);

    res.setHeader('Content-Type', 'application/json');

    if (errors.length) {
      sendResponse(res, 400, { errors });

      return;
    }

    const responseBody = prepareResponseBody(originalText, targetCase);

    sendResponse(res, 200, responseBody);
  });

  return server;
};

module.exports = {
  createServer,
};
