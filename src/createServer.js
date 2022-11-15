const http = require('http');
const { isError } = require('./isError');
const { convertToCase } = require('./convertToCase');

function createServer() {
  const server = http.createServer((req, res) => {
    const [originalText, targetCase] = req.url
      .slice(1)
      .split('?')
      .map((a) => a.replace('toCase=', ''));
    const error = isError(originalText, targetCase);

    if (error.errors.length) {
      res.writeHead(400, 'Bad request', {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify(error));
    } else {
      const { originalCase, convertedText } = convertToCase(
        originalText,
        targetCase,
      );
      const retObj = {
        originalCase,
        targetCase,
        originalText,
        convertedText,
      };

      res.writeHead(200, 'OK', {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify(retObj));
    };
  });

  return server;
}

module.exports = { createServer };
