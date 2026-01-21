const http = require('http');

const { convertToCase } = require('./convertToCase/convertToCase');
const { errorCase } = require('./Error');
const { sendJSONResponse } = require('./senResponse');

const createServer = () => {
  const server = http.createServer((req, res) => {
    const url = new URL(req.url || '', `http://${req.headers.host}`);

    const originalText = url.pathname.slice(1);
    const targetCase = url.searchParams.get('toCase');

    const hasError = errorCase.hasError(originalText, targetCase);

    if (hasError) {
      const errors = errorCase.getError(originalText, targetCase);

      return sendJSONResponse(res, 400, { errors }, 'Bad request');
    }

    try {
      const { originalCase, convertedText } = convertToCase(
        originalText,
        targetCase,
      );

      return sendJSONResponse(res, 200, {
        originalCase,
        targetCase,
        originalText,
        convertedText,
      });
    } catch (error) {
      return sendJSONResponse(
        res,
        500,
        { errors: { message: error.message } },
        'Internal Server Error',
      );
    }
  });

  return server;
};

module.exports = { createServer };
