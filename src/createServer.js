const http = require('http');

const { convertToCase } = require('./convertToCase');
const { supportedCases } = require('./const/supportedCases');
const {
  TEXT_IS_REQUIRED,
  TOCASE_IS_REQUIRED,
  CASE_IS_NOT_SUPPORTED,
} = require('./const/errors');

const createServer = () => {
  const server = http.createServer((req, res) => {
    const { pathname, searchParams } = new URL(
      `http://localhost:5700${req.url}`,
    );
    const text = pathname.substring(1);
    const toCase = searchParams.get('toCase');
    const errors = [];

    let result;

    if (!text) {
      errors.push({
        message: TEXT_IS_REQUIRED,
      });
    }

    if (!toCase) {
      errors.push({
        message: TOCASE_IS_REQUIRED,
      });
    }

    if (toCase && !supportedCases.includes(toCase.toUpperCase())) {
      errors.push({
        message: CASE_IS_NOT_SUPPORTED,
      });
    }

    if (errors.length !== 0) {
      respondWithError(res, 400, errors);

      return;
    }

    try {
      result = convertToCase(text, toCase);
      res.writeHead(200, { 'Content-Type': 'application/json' });
    } catch (error) {
      return respondWithError(res, 400, error.message);
    }

    res.end(
      JSON.stringify({
        originalCase: result.originalCase,
        targetCase: toCase.toUpperCase(),
        convertedText: result.convertedText,
        originalText: text,
      }),
    );
  });

  return server;
};

const respondWithError = (res, statusCode, messages) => {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ errors: messages }));
};

module.exports = { createServer };
