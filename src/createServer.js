/* eslint-disable no-console */
const http = require('http');
const { validateCase } = require('./validateCase');
const { convertToCase } = require('./convertToCase/convertToCase');

function createServer() {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const { pathname, searchParams } = new URL(
      req.url,
      `http://${req.headers.server}`,
    );

    const originalText = pathname.slice(1).split('?')[0];
    const targetCase = searchParams.get('toCase');

    const errors = validateCase(originalText, targetCase);

    if (errors.length) {
      res.statusCode = 400;
      res.statusText = 'Bad request';

      return res.end(JSON.stringify({ errors }));
    } else {
      res.statusCode = 200;
      res.statusText = 'OK';

      const { originalCase, convertedText } = convertToCase(
        originalText,
        targetCase,
      );

      res.end(
        JSON.stringify({
          originalCase,
          targetCase,
          originalText,
          convertedText,
        }),
      );
    }
  });

  server.on('error', (err) => {
    console.error(err);
  });

  return server;
}

module.exports = { createServer };
