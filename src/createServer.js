const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');
const { normalizeURL } = require('./normalizeUrl');
const { validateErrors } = require('./validateErrors');
const { sendResponse } = require('./sendResponse');

const createServer = () => {
  const server = http.createServer((req, res) => {
    const paramsToConvert = normalizeURL(req.url);
    const errors = validateErrors(...paramsToConvert);

    if (errors.length > 0) {
      sendResponse(res, 'Bad request', 400, JSON.stringify({ errors }));

      return;
    }

    const convertedText = convertToCase(...paramsToConvert);

    sendResponse(res, 'OK', 200, JSON.stringify({
      originalCase: convertedText.originalCase,
      targetCase: paramsToConvert[1],
      originalText: paramsToConvert[0],
      convertedText: convertedText.convertedText,
    }));
  });

  return server;
};

module.exports = {
  createServer,
};
