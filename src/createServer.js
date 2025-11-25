const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');
const { checkParams } = require('./checkParams');
const { normalaizeUrl } = require('./normalaizeUrl');

function sendResponse(res, stat, data) {
  res.writeHead(stat, { 'Content-Type': 'application/json' });

  return res.end(JSON.stringify(data));
};

function createServer() {
  return http.createServer((req, res) => {
    const {
      textToConvert,
      neededCase,
    } = normalaizeUrl(req.url, req.headers.host);

    const validation = checkParams(textToConvert, neededCase);

    if (validation.errors.length) {
      sendResponse(res, 400, validation);
    }

    const {
      originalCase,
      convertedText,
    } = convertToCase(textToConvert, neededCase);

    const data = {
      originalCase,
      targetCase: neededCase,
      originalText: textToConvert,
      convertedText,
    };

    sendResponse(res, 200, data);
  });
};

module.exports = { createServer };
