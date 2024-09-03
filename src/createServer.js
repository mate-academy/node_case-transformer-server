const http = require('http');
const { convertToCase } = require('./convertToCase');
const { validateURL } = require('./validateURL');

const createServer = () => {
  return http.createServer((req, res) => {
    const normalizedURL = new URL(req.url, `http://${req.headers.host}`);
    const textToConvert = normalizedURL.pathname.slice(1);
    const toCase = normalizedURL.searchParams.get('toCase');

    res.setHeader('Content-Type', 'application/json');

    const errors = validateURL(textToConvert, toCase);

    if (errors.length) {
      res.writeHead(400, 'Bad request');
      res.end(JSON.stringify({ errors }));

      return;
    }

    const responseBody = convertToCase(textToConvert, toCase);

    res.writeHead(200, 'OK');

    res.end(
      JSON.stringify({
        ...responseBody,
        targetCase: toCase,
        originalText: textToConvert,
      }),
    );
  });
};

module.exports.createServer = createServer;
