const http = require('http');
const { sendResponse } = require('./sendResponse');
const { validation } = require('./validation');
const { normalizeURL } = require('./normalizeURL');
const { convertToCase } = require('./convertToCase/convertToCase');

function createServer() {
  const server = http.createServer((req, res) => {
    const [text, toCase] = normalizeURL(req);
    const errors = validation(text, toCase);

    if (errors.length) {
      return sendResponse(res,'Unable to send Response', 400, { errors })
    }

    const { convertedText, originalCase } = convertToCase(text, toCase);

    const resBody = {
      originalCase,
      targetCase: toCase,
      originalText: text,
      convertedText,
    }

    sendResponse(res, 'OK', 200, resBody);
  });

  return server;
}

module.exports = { createServer }
