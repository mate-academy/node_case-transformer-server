const http = require('http');
const {
  parseUrl,
  validate,
  sendResponse,
  sendTransformedResponse,
} = require('./utils/helpers');
const { statusCodes, errorMessages } = require('./utils/constants');

function createServer() {
  const server = http.createServer((req, res) => {
    const { BAD_REQUEST, INTERNAL_SERVER_ERROR } = statusCodes;

    try {
      const { targetCase, originalText } = parseUrl(req);
      const errors = validate(targetCase, originalText);

      if (errors.length > 0) {
        sendResponse(res, BAD_REQUEST, { errors });
      } else {
        sendTransformedResponse(res, targetCase, originalText);
      }
    } catch {
      sendResponse(res, INTERNAL_SERVER_ERROR, {
        errors: [{ message: errorMessages.internalError }],
      });
    }
  });

  return server;
}

module.exports = {
  createServer,
};
