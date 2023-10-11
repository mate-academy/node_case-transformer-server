const http = require('http');

const {
  ERROR_NO_TEXT_PROVIDED,
  ERROR_NO_CASE_PROVIDED,
  AVAILABLE_CASES,
  ERROR_INVALID_CASE,
  CODE_ERROR_OCCURRED,
  CODE_SUCCESS,
} = require('./utils/constants');
const { convertToCase } = require('./convertToCase');

function createServer() {
  return http.createServer((req, res) => {
    res.setHeader('Content-type', 'application/json');

    const errors = [];
    const fullUrl = `http://${req.headers.host}${req.url}`;
    const requestURL = new URL(fullUrl);
    const originalText = requestURL.pathname.slice(1);
    const targetCase = requestURL.searchParams.get('toCase');

    if (!originalText) {
      errors.push({ message: ERROR_NO_TEXT_PROVIDED });
    }

    if (!targetCase) {
      errors.push({ message: ERROR_NO_CASE_PROVIDED });
    }

    if (targetCase && !AVAILABLE_CASES.includes(targetCase)) {
      errors.push({ message: ERROR_INVALID_CASE });
    }

    if (errors.length) {
      res.statusCode = CODE_ERROR_OCCURRED;

      const errorResponse = JSON.stringify({ errors });

      res.end(errorResponse);

      return;
    }

    res.statusCode = CODE_SUCCESS;

    const { originalCase, convertedText } = convertToCase(
      originalText,
      targetCase,
    );

    const responseBody = JSON.stringify({
      originalCase,
      targetCase,
      originalText,
      convertedText,
    });

    res.end(responseBody);
  });
}

module.exports = {
  createServer,
};
