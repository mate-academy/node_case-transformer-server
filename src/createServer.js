const http = require('http');
const { convertToCase } = require('./convertToCase');
const { handleErrors } = require('./handleErrors');

function createServer() {
  return http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const normalizeURL = new URL(req.url, `http://${req.headers.host}`);

    const targetCase = normalizeURL.searchParams.get('toCase');
    const originalText = normalizeURL.pathname.slice(1);

    const errors = handleErrors(originalText, targetCase);

    if (errors.length > 0) {
      res.statusCode = 404;
      res.statusMessage = 'Bad request';

      res.end(JSON.stringify({
        errors,
      }));

      return;
    }

    res.statusCode = 200;
    res.statusMessage = 'OK';

    res.end(JSON.stringify({
      ...convertToCase(originalText, targetCase),
      targetCase,
      originalText,
    }));
  });
};

createServer();

module.exports = {
  createServer,
};
