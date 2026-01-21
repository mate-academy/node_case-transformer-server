const http = require('http');
const { findError } = require('./findeError');
const { getTextAndCase } = require('./getTextAndCase');

function createServer() {
  const server = http.createServer((req, res) => {
    const [text, toCase] = getTextAndCase(req);

    res.setHeader('Content-Type', 'application/json');

    const response = {
      originalText: text,
      targetCase: toCase,
    };

    const responseError = findError(response);

    if (responseError.errors.length) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      res.end(JSON.stringify(responseError));

      return;
    }

    res.statusCode = 200;
    res.end(JSON.stringify(response));
  });

  return server;
}

module.exports = {
  createServer,
};
