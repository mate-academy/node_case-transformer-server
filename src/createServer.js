const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');
const { sendResponse } = require('./utils/sendResponse');
const { parseRequest } = require('./utils/parseRequest');
const { validateInput } = require('./utils/validation');

const httpStatusCodes = {
  BAD_REQUEST: 400,
  OK: 200,
  INTERNAL_SERVER_ERROR: 500,
};

const validationMiddleware =
  (originalText, targetCase) => (_req, res, next) => {
    const validationErrors = validateInput(originalText, targetCase);

    if (validationErrors.length > 0) {
      sendResponse(res, httpStatusCodes.BAD_REQUEST, {
        errors: validationErrors,
      });
    } else {
      next();
    }
  };

function createServer() {
  const server = http.createServer((req, res) => {
    try {
      const { originalText, targetCase } = parseRequest(req);
      const validate = validationMiddleware(originalText, targetCase);

      validate(req, res, () => {
        handleValidRequest(req, res, originalText, targetCase);
      });
    } catch {
      handleInternalServerError(res);
    }
  });

  return server;
}

function handleValidRequest(_req, res, originalText, targetCase) {
  const { originalCase, convertedText } = convertToCase(
    originalText,
    targetCase,
  );

  sendResponse(res, httpStatusCodes.OK, {
    originalCase,
    targetCase,
    originalText,
    convertedText,
  });
}

function handleInternalServerError(res) {
  sendResponse(res, httpStatusCodes.INTERNAL_SERVER_ERROR, {
    errors: ['Internal server error'],
  });
}

module.exports = { createServer };
