const http = require('http');
const { parseUrl, sendResponse, validate } = require('./utils/helpers');
const { convertToCase } = require('./convertToCase/convertToCase');
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

function sendTransformedResponse(res, targetCase, originalText) {
  const { originalCase, convertedText } = convertToCase(
    originalText,
    targetCase,
  );

  sendResponse(res, statusCodes.OK, {
    originalCase,
    targetCase,
    originalText,
    convertedText,
  });
}

module.exports = {
  createServer,
};
