const { convertToCase } = require('./convertToCase/convertToCase');
const http = require('http');
const {
  availableCases,
  errorMessage,
  createErrorResponse: sendResponse,
} = require('./utils');

const validateRequest = (originalText, targetCase) => {
  const errors = [];

  if (!originalText) {
    errors.push({ message: errorMessage.missingText });
  }

  if (!targetCase) {
    errors.push({ message: errorMessage.missingCase });
  }

  if (targetCase && !availableCases.includes(targetCase)) {
    errors.push({ message: errorMessage.unavailableCase });
  }

  return errors;
};

const createServer = () => {
  const server = http.createServer((req, res) => {
    const normalizedUrl = new URL(req.url, `http://${req.headers.host}`);
    const originalText = normalizedUrl.pathname.slice(1);
    const targetCase = normalizedUrl.searchParams.get('toCase');

    const errors = validateRequest(originalText, targetCase);

    if (errors.length) {
      sendResponse(res, 400, 'Bad Request', errors);

      return;
    }

    res.statusCode = 200;

    const {
      originalCase,
      convertedText,
    } = convertToCase(originalText, targetCase);

    const result = {
      originalCase,
      targetCase,
      originalText,
      convertedText,
    };

    sendResponse(res, 200, 'OK', result);
  });

  return server;
};

createServer();

module.exports = { createServer };
