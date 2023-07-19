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

    const errors = validateData(originalText, targetCase);

    if (errors.length) {
      sendResponse(response, 400, 'Bad request', { errors });

      return;
    }

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

    sendResponse(response, 200, 'OK', result);
  });

  return server;
};

module.exports = { createServer };
