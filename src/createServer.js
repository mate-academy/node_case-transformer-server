const http = require('http');
const { validateURL } = require('./validateUrl');
const { convertToCase } = require('./convertToCase/convertToCase');

function createServer() {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const formatedPath = req.url.slice(1);
    const [text, queryString] = formatedPath.split('?');

    const params = new URLSearchParams(queryString);
    const toCase = params.get('toCase');

    const errors = validateURL(text, toCase);

    if (errors.length) {
      res.statusCode = 400;
      res.end(JSON.stringify({ errors }));

      return;
    }

    const { originalCase, convertedText } = convertToCase(text, toCase);

    const result = JSON.stringify({
      originalCase,
      targetCase: toCase,
      originalText: text,
      convertedText,
    });

    res.statusCode = 200;
    res.statusMessage = 'OK';
    res.end(result);
  });

  return server;
}

module.exports = { createServer };
