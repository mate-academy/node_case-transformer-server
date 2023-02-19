// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here
const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');
const { validateURL } = require('./validateURL');

const createServer = () => {
  const server = http.createServer((req, res) => {
    const normalizedURL = new URL(req.url, `http://${req.headers.host}`);
    const originalText = normalizedURL.pathname.slice(1);
    const targetCase = normalizedURL.searchParams.get('toCase');
    const errors = validateURL(originalText, targetCase);

    res.setHeader('Content-Type', 'application/json');

    if (errors.length) {
      res.end(JSON.stringify({ errors }));
    } else {
      const converted = convertToCase(originalText, targetCase);

      res.end(JSON.stringify({
        ...converted,
        originalText,
        targetCase,
      }));

      res.statusCode = 200;
    }
  });

  return server;
};

exports.createServer = createServer;
