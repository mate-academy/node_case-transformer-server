const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase.js');
const { urlValidator } = require('./urlValidator.js');
const { SUCCESS_CODE, BAD_REQUEST_CODE } = require('./statusCodes.js');

function createServer() {
  const server = http.createServer((req, res) => {
    res.writeHead(SUCCESS_CODE, { 'content-type': 'application/json' });

    const serverLink = `http://${req.headers.host}`;

    const normalisedUrl = new URL(req.url, serverLink);
    const textToConvert = normalisedUrl.pathname.slice(1);
    const style = normalisedUrl.searchParams.get('toCase');

    const errorMessage = urlValidator(textToConvert, style);

    if (errorMessage) {
      res.statusCode = BAD_REQUEST_CODE;
      res.statusMessage = 'Bad request';

      res.end(JSON.stringify({
        errors: errorMessage,
      }));

      return;
    }

    res.statusCode = SUCCESS_CODE;

    const convertedText = convertToCase(textToConvert, style);
    const preparedResponse = {
      ...convertedText,
      originalText: textToConvert,
      targetCase: style,
    };

    res.end(JSON.stringify(preparedResponse));
  });

  return server;
}

module.exports = {
  createServer,
};
