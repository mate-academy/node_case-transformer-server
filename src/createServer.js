const http = require('http');
const { convertToCase } = require('./convertToCase');
const { validateRequest } = require('./helpers/errorMessages');
const {
  formatErrorResponse,
  formatSuccessResponse,
} = require('./helpers/responseFormatter');

const createServer = () => {
  return http.createServer((req, res) => {
    const normalizedUrl = new URL(req.url, 'http://localhost:5700');
    const params = new URLSearchParams(normalizedUrl.searchParams);
    const text = normalizedUrl.pathname.slice(1);
    const toCase = params.get('toCase');

    res.setHeader('Content-Type', 'application/json');

    const validationErrors = validateRequest(
      text,
      toCase ? toCase.toUpperCase() : null,
    );

    if (validationErrors.length > 0) {
      res.statusCode = 400;
      res.statusMessage = 'Bad Request';
      res.end(JSON.stringify(formatErrorResponse(validationErrors)));

      return;
    }

    try {
      const targetCase = toCase.toUpperCase();
      const convertedData = convertToCase(text, targetCase);
      const result = formatSuccessResponse(convertedData, targetCase, text);

      res.statusCode = 200;
      res.statusMessage = 'OK';
      res.end(JSON.stringify(result));
    } catch (error) {
      res.statusCode = 500;
      res.statusMessage = 'Internal Server Error';

      res.end(
        JSON.stringify({ errors: [{ message: 'Internal Server Error' }] }),
      );
    }
  });
};

module.exports = {
  createServer,
};
