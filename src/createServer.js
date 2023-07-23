
const { convertToCase } = require('./convertToCase/convertToCase');
const http = require('http');
const {
  availableCases,
  errorMessage,
  createErrorResponse,
} = require('./utils');

const createServer = () => {
  const server = http.createServer((req, res) => {
    const normalizedUrl = new URL(req.url, `http://${req.headers.host}`);
    const originalText = normalizedUrl.pathname.slice(1);
    const targetCase = normalizedUrl.searchParams.get('toCase');

    const errors = [];

    if (!originalText) {
      errors.push({ message: errorMessage.missingText });
    }

    if (!targetCase) {
      errors.push({ message: errorMessage.missingCase });
    } else if (!availableCases.includes(targetCase)) {
      errors.push({ message: errorMessage.unavailableCase });
    }

    if (errors.length) {
      createErrorResponse(res, 400, errors);

      return;
    }

    res.statusCode = 200;

    const { originalCase, convertedText } = convertToCase(
      originalText, targetCase,
    );

    const result = {
      originalCase,
      targetCase,
      originalText,
      convertedText,
    };

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result));
  });

  return server;
};

createServer();

module.exports = { createServer };
