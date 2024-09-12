const http = require('http');
const { convertToCase } = require('./convertToCase');
const {
  paramValidator,
  sendResponse,
} = require('./server');

function createServer() {
  const server = http.createServer((req, res) => {
    const url = req.url.split('?');
    const textToConvert = url[0].slice(1);
    const params = new URLSearchParams(url[1]);
    const toCase = params.get('toCase');

    try {
      paramValidator(textToConvert, toCase);
    } catch (errors) {
      sendResponse(res, 400, errors);

      return;
    }

    const result = convertToCase(textToConvert, toCase);

    result.targetCase = toCase;
    result.originalText = textToConvert;

    sendResponse(res, 200, result);
  });

  return server;
};

module.exports = {
  createServer,
};
