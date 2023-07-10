const http = require('http');
const { convertToCase } = require('./convertToCase');
const { validate } = require('./validate');

function createServer() {
  return http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const url = new URL(req.url, `https://${req.headers.host}`);

    const originalText = url.pathname.slice(1);
    const targetCase = url.searchParams.get('toCase');

    const errors = validate(originalText, targetCase);

    if (errors.length) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';

      res.end(JSON.stringify({ errors }));

      return;
    }

    const { originalCase, convertedText } = convertToCase(originalText, targetCase);

    const result = {
      originalCase,
      targetCase,
      originalText,
      convertedText,
    };

    res.statusCode = 200;
    res.statusMessage = 'OK';

    res.end(JSON.stringify(result));
  });
}

module.exports = {
  createServer,
};
