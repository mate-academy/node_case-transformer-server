const http = require('node:http');
const { checkCase } = require('./convertToCase/checkCase');
const { convertToCase } = require('./convertToCase/');

function validateRequestParams(text, toCase) {
  const errors = [];

  if (!text) {
    errors.push({
      message: 'Text to convert is required. '
        + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  }

  if (!toCase) {
    errors.push({
      message: '"toCase" query param is required.'
        + ' Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  }

  if (!checkCase(toCase) && !!toCase) {
    errors.push({
      message: 'This case is not supported. '
      + 'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
    });
  }

  return errors.length === 0 ? null : errors;
}

function createServer() {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;

    const normalizeUrl = new URL(req.url, 'http://localhost:5700');

    const TEXT = normalizeUrl.pathname.slice(1);

    const objectUrl = Object.fromEntries(normalizeUrl.searchParams.entries());

    const targetCase = objectUrl.toCase;

    let convertedData = {};

    const validationError = validateRequestParams(TEXT, targetCase);

    if (validationError) {
      const errorMessage = {
        errors: validationError,
      };

      res.end(JSON.stringify(errorMessage));
    } else {
      convertedData = convertToCase(TEXT, targetCase);

      const jsonData = {
        originalCase: convertedData.originalCase,
        targetCase,
        originalText: TEXT,
        convertedText: convertedData.convertedText,
      };

      res.end(JSON.stringify(jsonData));
    }
  });

  return server;
}

module.exports = {
  createServer,
};
