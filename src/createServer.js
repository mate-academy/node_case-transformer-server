const http = require('http');
const { validateRequest } = require('./validateRequest');
const { convertToCase } = require('./convertToCase/convertToCase');

function createServer() {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const [originalText, queryString] = req.url.slice(1).split('?');

    const params = new URLSearchParams(queryString);
    const targetCase = params.get('toCase');

    const errors = validateRequest(originalText, targetCase);

    if (errors) {
      res.statusCode = 400;
      res.statusText = 'Bag request';

      return res.end(JSON.stringify(errors));
    }

    const { originalCase, convertedText } = convertToCase(
      originalText,
      targetCase,
    );

    res.statusCode = 200;
    res.statusText = 'OK';

    return res.end(
      JSON.stringify({
        originalCase,
        targetCase,
        convertedText,
        originalText,
      }),
    );
  });

  return server;
}

module.exports = { createServer };
