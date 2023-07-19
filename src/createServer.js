const http = require('http');
const { sendResponse } = require('./sendResponse');
const { convertToCase } = require('./convertToCase/convertToCase');
const { validateData } = require('./validateData');

const createServer = () => {
  const server = http.createServer((request, response) => {
    const normalizedURL = new URL(request.url, `http://${request.headers.host}`);
    const originalText = normalizedURL.pathname.slice(1);
    const params = normalizedURL.searchParams;
    const targetCase = params.get('toCase');

    const { isError, errorMessages } = validateData(originalText, targetCase);
    let payload;

    if (isError) {
      payload = {
        errors: errorMessages,
      };

      sendResponse(response, 400, 'Bad request', payload);

      return;
    }

    const {
      originalCase,
      convertedText,
    } = convertToCase(originalText, targetCase);

    payload = {
      originalCase,
      targetCase,
      originalText,
      convertedText,
    };
    sendResponse(response, 200, 'OK', payload);
  });

  return server;
};

module.exports = { createServer };
