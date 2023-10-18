const http = require('http');
const { convertToCase } = require('./convertToCase');
const { processErrors } = require('./processErrors');

function createServer() {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const url = new URL(`http://${req.headers.host}${req.url}`);
    const originalText = url.pathname.slice(1);
    const targetCase = url.searchParams.get('toCase');

    const errors = processErrors(originalText, targetCase);

    if (errors.length) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      res.end(JSON.stringify({ errors }));

      return;
    };

    const { originalCase, convertedText } = convertToCase(
      originalText,
      targetCase,
    );

    const payload = {
      originalCase,
      targetCase,
      originalText,
      convertedText,
    };

    res.statusCode = 200;
    res.statusText = 'OK';
    res.end(JSON.stringify(payload));
  });

  return server;
}

module.exports = {
  createServer,
};
