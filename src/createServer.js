const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');
const { validateData } = require('./validateData');

function createServer() {
  const server = http.createServer((req, res) => {
    const normalizedUrl = new URL(`http://${req.headers.host}${req.url}`);
    const textToConvert = normalizedUrl.pathname.slice(1);
    const toCase = normalizedUrl.searchParams.get('toCase');

    const errors = validateData(textToConvert, toCase);

    res.setHeader('Content-Type', 'application/json');

    if (!errors.length) {
      const result = convertToCase(textToConvert, toCase);

      result.targetCase = toCase;
      result.originalText = textToConvert;
      res.statusCode = 200;
      res.statusText = 'OK';
      res.end(JSON.stringify(result));

      return;
    }
    res.statusCode = 400;
    res.statusText = 'Bad request';
    res.end(JSON.stringify({ errors }));
  });

  return server;
}

module.exports = { createServer };
