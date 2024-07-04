const { createServer } = require('http');

const { convertToCase } = require('./convertToCase');
const { getErrorCollector } = require('./getErrorCollector');
const { ERROR_MESSAGE, TO_CASE_QUERY } = require('./variables');

module.exports.createServer = () =>
  createServer((request, response) => {
    response.setHeader('Content-Type', 'application/json');

    const errorCollector = getErrorCollector();
    const url = new URL(request.url, `http://${request.headers.host}`);
    const originalText = url.pathname.slice(1);
    const targetCase = new URLSearchParams(url.search).get(TO_CASE_QUERY);

    if (!originalText) {
      errorCollector.catchIfThrown(() => {
        throw new Error(ERROR_MESSAGE.TEXT_REQUIRED);
      });
    }

    const convertedText = errorCollector.catchIfThrown(() => {
      if (!targetCase) {
        throw new Error(ERROR_MESSAGE.TO_CASE_REQUIRED);
      }

      try {
        return convertToCase(originalText, targetCase);
      } catch {
        throw new Error(ERROR_MESSAGE.INVALID_TO_CASE);
      }
    });

    const errors = errorCollector.getAll();

    if (errors) {
      response.writeHead(400);
      response.end(JSON.stringify({ errors }));
    } else {
      response.writeHead(200);

      response.end(
        JSON.stringify({
          targetCase,
          originalText,
          ...convertedText,
        }),
      );
    }
  });
