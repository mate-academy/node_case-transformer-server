const http = require('http');
const { convertToCase } = require('./convertToCase');
const { handleErrors } = require('./handleErrors');

function createServer() {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-type', 'application/json');

    const normalizedURL = new URL(req.url, `http://${req.headers.host}`);
    const textToConvert = normalizedURL.pathname.slice(1);
    const toCase = normalizedURL.searchParams.get('toCase');

    const errors = handleErrors(textToConvert, toCase);

    if (errors.errors.length) {
      req.statusCode = 404;
      req.statusMessage = 'Bad request';
      res.end(JSON.stringify(errors));
    } else {
      req.statusMessage = 'OK';

      const convertedText = convertToCase(textToConvert, toCase);

      res.end(JSON.stringify({
        ...convertedText,
        targetCase: toCase,
        originalText: textToConvert,
      }));
    }
  });

  return server;
}

module.exports = {
  createServer,
};
