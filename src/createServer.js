const http = require('http');
const { convertToCase } = require('./convertToCase');
const { handleErrorMessage } = require('./handleError');
const { sendResponse } = require('./sendResponse');

function createServer() {
  const server = http.createServer((req, res) => {
    const normalizedUrl = new URL(req.url, `http://${req.headers.host}`);

    const textToConvert = normalizedUrl.pathname.slice(1);

    const params = Object.fromEntries(normalizedUrl.searchParams.entries());

    const toCase = params.toCase;

    const errors = handleErrorMessage(textToConvert, toCase);

    if (errors.length) {
      sendResponse(res, 'Bad request', 400, JSON.stringify({ errors }));

      return;
    }

    const { originalCase, convertedText } = convertToCase(
      textToConvert, toCase,
    );

    sendResponse(res, 'OK', 200, JSON.stringify({
      originalCase,
      convertedText,
      targetCase: toCase,
      originalText: textToConvert,
    }));
  });

  return server;
}

module.exports = {
  createServer,
};
