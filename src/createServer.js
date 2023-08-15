import http from 'http';

const { validationURL } = require('./validationURL');
const { convertToCase } = require('./convertToCase');

function createServer() {
  return http.createServer((req, res) => {
    const myURL = new URL(req.url, `https://${req.headers.host}`);
    const text = myURL.pathname.slice(1);
    const toCase = myURL.searchParams.get('toCase');
    const errors = validationURL(text, toCase);

    res.setHeader('Content-Type', 'application/json');

    if (errors.length) {
      res.writeHead(400, 'Error', { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ errors }));

      return;
    }

    res.writeHead(200, 'OK', { 'Content-Type': 'application/json' });

    const { originalCase, convertedText } = convertToCase(text, toCase);

    res.end(JSON.stringify({
      originalCase,
      targetCase: toCase,
      originalText: text,
      convertedText,
    }));
  });
};

module.exports = { createServer };
