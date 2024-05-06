const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');
const { sendResponse } = require('./utils/sendResponse');
const { parseRequest } = require('./utils/parseRequest');
const { validateInput } = require('./utils/validateInput');

function createServer() {
  const server = http.createServer((req, res) => {
    try {
      const { originalText, targetCase } = parseRequest(req);

      const validationErrors = validateInput(originalText, targetCase);

      if (validationErrors.length > 0) {
        sendResponse(res, 400, { errors: validationErrors });

        return;
      }

      const { originalCase, convertedText } = convertToCase(
        originalText,
        targetCase,
      );

      sendResponse(res, 200, {
        originalCase,
        targetCase,
        originalText,
        convertedText,
      });
    } catch {
      sendResponse(res, 400, { errors: ['Internal server error'] });
    }
  });

  return server;
}

module.exports = { createServer };
