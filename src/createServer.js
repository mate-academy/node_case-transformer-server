
const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');
const { validator } = require('./validator');

function createServer() {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const normalizeURL = new URL(req.url, `http://${req.headers.host}`);
    const sourseText = normalizeURL.pathname.split('/').slice(-1)[0];
    const toCase = normalizeURL.searchParams.get('toCase');
    const errors = validator(sourseText, toCase);

    if (errors.errors.length) {
      res.statusCode = 404;
      res.statusMessage = 'something go wrong';
      res.end(JSON.stringify(errors));
    } else {
      res.statusCode = 200;

      const convertedText = convertToCase(sourseText, toCase);

      res.end(JSON.stringify({
        ...convertedText,
        targetCase: toCase,
        originalText: sourseText,

      }));
    }
  });

  return server;
}

module.exports = { createServer };
