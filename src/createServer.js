const http = require('node:http');
const { convertToCase } = require('./convertToCase/convertToCase');
const { allErrors } = require('./errors');

function createServer() {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const [originalText, queryString] = req.url.slice(1).split('?');
    const params = new URLSearchParams(queryString);
    const targetCase = params.get('toCase');
    const errors = allErrors(originalText, targetCase);

    if (errors.length) {
      res.statusCode = 400;
      res.statusText = 'Bad request';
      res.end(JSON.stringify({ errors }));

      return;
    }

    const { originalCase, convertedText } = convertToCase(
      originalText,
      targetCase,
    );

    res.statusCode = 200;
    res.statusText = 'OK';

    res.end(
      JSON.stringify({
        originalCase,
        targetCase,
        originalText,
        convertedText,
      }),
    );
  });

  return server;
}

module.exports = { createServer };
