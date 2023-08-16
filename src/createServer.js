const http = require('http');
const { convertToCase, CASE_TYPES } = require('./convertToCase');
const { ERROR_TYPES } = require('./constants');

const createServer = () => {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;

    const [endpoint, searchParams] = req.url.split('?');

    const targetCase = new URLSearchParams(searchParams).get('toCase');
    const originalText = endpoint.slice(1);

    const error = {
      errors: [],
    };

    if (!originalText) {
      error.errors.push({
        message: ERROR_TYPES.missingText,
      });
    }

    if (!targetCase) {
      error.errors.push({
        message: ERROR_TYPES.missingCase,
      });
    }

    if (!CASE_TYPES.includes(targetCase)) {
      error.errors.push({
        message: ERROR_TYPES.caseIsNotValid,
      });
    }

    if (error.errors.length) {
      res.statusCode = 400;
      res.end(JSON.stringify(error));

      return;
    }

    const {
      originalCase,
      convertedText,
    } = convertToCase(originalText, targetCase);

    const responseData = {
      originalCase,
      targetCase,
      originalText,
      convertedText,
    };

    res.end(JSON.stringify(responseData));
  });

  return server;
};

module.exports = { createServer };
