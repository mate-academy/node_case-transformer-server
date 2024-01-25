const http = require('node:http');

const { convertToCase } = require('./convertToCase');
const { detectErrors } = require('./detectErrors');

module.exports = {
  createServer,
};

function createServer() {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-type', 'application/json');

    const normalizedUrl = new URL(req.url, `http://${req.headers.host}`);
    const originalText = normalizedUrl.pathname.slice(1);
    const targetCase = normalizedUrl.searchParams.get('toCase') || '';

    /* eslint spaced-comment: "warn" */
    /**@type {{errors: {message: string}[]}} */
    const errObj = {
      errors: detectErrors({
        originalText,
        targetCase,
      }),
    };

    if (errObj.errors.length) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      res.end(JSON.stringify(errObj));
    } else {
      const {
        originalCase,
        convertedText,
      } = convertToCase(originalText, targetCase);

      res.statusCode = 200;

      res.end(JSON.stringify({
        originalCase,
        targetCase,
        originalText,
        convertedText,
      }));
    }
  });

  return server;
};
