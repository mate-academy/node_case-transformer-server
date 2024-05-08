const http = require('http');
const { convertToCase } = require('./convertToCase');
const { collectErrors } = require('./collectErrors');

function createServer() {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const urlParts = req.url.split('?');
    const params = new URLSearchParams(urlParts[1]);

    const text = urlParts[0].slice(1);
    const toCase = params.get('toCase');

    const errors = collectErrors(text, toCase);

    if (errors.length) {
      res.statusCode = 400;
      res.statusText = 'Bad request';

      return res.end(JSON.stringify({ errors }));
    } else {
      res.statusCode = 200;
      res.statusText = 'OK';

      const { originalCase, convertedText } = convertToCase(text, toCase);

      res.end(
        JSON.stringify({
          originalCase,
          convertedText,
          originalText: text,
          targetCase: toCase,
        }),
      );
    }
  });

  return server;
}

module.exports = { createServer };
