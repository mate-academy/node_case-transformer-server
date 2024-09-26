const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');
const { catchError } = require('./catchError');
const { parseUrlText } = require('./parseUrlText');

function createServer() {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const {
      originalText,
      targetCase,
    } = parseUrlText(req.url, req.headers.host);

    const errors = catchError(originalText, targetCase);

    if (errors.length) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      res.end(JSON.stringify({ errors }));

      return;
    }

    const {
      originalCase,
      convertedText,
    } = convertToCase(originalText, targetCase);

    res.statusCode = 200;
    res.statusMessage = 'OK';

    res.end(JSON.stringify({
      originalCase,
      targetCase,
      originalText,
      convertedText,
    }));
  });

  return server;
}

module.exports = {
  createServer,
};
