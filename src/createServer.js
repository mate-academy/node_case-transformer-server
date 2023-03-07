const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');
const { validate } = require('./validate');

const createServer = () => {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const normalizedURL = new URL(req.url, `http://${req.headers.host}`);
    const toCase = normalizedURL.searchParams.get('toCase');
    const pathname = normalizedURL.pathname.slice(1);
    const errors = validate(pathname, toCase);

    if (errors.length) {
      req.statusCode = 400;
      req.statusMessage = 'Bad request';
      res.end(JSON.stringify({ errors }));
    } else {
      const convertedPath = convertToCase(pathname, toCase);

      res.end(JSON.stringify({
        originalCase: convertedPath.originalCase,
        targetCase: toCase,
        originalText: pathname,
        convertedText: convertedPath.convertedText,
      }));
    }
  });

  return server;
};

module.exports = { createServer };
