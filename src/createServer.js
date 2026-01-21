const http = require('http');
const { convertToCase } = require('./convertToCase');
const { checkErrors } = require('./checkErrors');

function createServer() {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const url = new URL(req.url, `http://${req.headers.host}`);
    const originalText = url.pathname.slice(1);
    const toCase = url.searchParams.get('toCase');
    const errors = checkErrors(originalText, toCase);

    if (errors.length) {
      const errResult = {
        errors,
      };

      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      res.end(JSON.stringify(errResult));

      return;
    }

    res.statusCode = 200;
    res.statusMessage = 'OK';

    const { originalCase, convertedText } = convertToCase(originalText, toCase);
    const result = {
      originalCase,
      targetCase: toCase,
      originalText,
      convertedText,
    };

    res.end(JSON.stringify(result));
  });

  return server;
}

module.exports = {
  createServer,
};
