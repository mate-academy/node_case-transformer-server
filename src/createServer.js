const http = require('http');
const {
  parseUrl,
  validate,
  sendResponse,
  sendTransformedResponse,
} = require('./utils/helpers');
const { statusCodes } = require('./utils/constants');

function createServer() {
  const server = http.createServer((req, res) => {
    try {
      const { targetCase, originalText } = parseUrl(req);
      const errors = validate(targetCase, originalText);

      if (errors.length > 0) {
        sendResponse(res, statusCodes.BAD_REQUEST, { errors });
      } else {
        sendTransformedResponse(res, targetCase, originalText);
      }
    } catch {
      sendResponse(res, statusCodes.INTERNAL_SERVER_ERROR, {
        errors: ['Internal server error'],
      });
    }
  });

  return server;
}

module.exports = {
  createServer,
};
