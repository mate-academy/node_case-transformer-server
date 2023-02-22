const http = require('http');
const { convertToCase } = require('./convertToCase');
const { validateURL } = require('./validateURL');

function createServer() {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const normalizeUrl = new URL(req.url, `http://${req.headers.host}`);

    const textToConvert = normalizeUrl.pathname.slice(1);

    const params = Object.fromEntries(normalizeUrl.searchParams.entries());

    const toCase = params.toCase;

    const errors = validateURL(textToConvert, toCase);

    if (errors.length) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';

      res.end(JSON.stringify({ errors }));

      return;
    }

    const { originalCase, convertedText } = convertToCase(
      textToConvert, toCase,
    );

    res.statusCode = 200;
    res.statusMessage = 'OK';

    res.end(JSON.stringify({
      originalCase,
      convertedText,
      targetCase: toCase,
      originalText: textToConvert,
    }));
  });

  return server;
}

module.exports = {
  createServer,
};
