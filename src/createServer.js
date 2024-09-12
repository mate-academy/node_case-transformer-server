const http = require('http');
const { convertToCase } = require('./convertToCase');
const {
  ErrorMessages, availiableCases, PORT, HOST,
} = require('./constants');

const createServer = () => {
  return http.createServer((req, res) => {
    const currentUrl = new URL(req.url, `http://${HOST}:${PORT}`);
    const searchParams = currentUrl.searchParams;
    const toCase = searchParams.get('toCase');
    const text = req.url.split('?')[0].slice(1);

    const errors = [];

    if (!text) {
      errors.push(ErrorMessages.NoText);
    };

    if (!toCase) {
      errors.push(ErrorMessages.NoToCase);
    }

    if (toCase && !availiableCases.includes(toCase)) {
      errors.push(ErrorMessages.InvalidToCase);
    }

    if (errors.length) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.statusText = 'Bad Request';
      res.end(JSON.stringify({ errors }));
    } else {
      res.writeHead(200, { 'Content-type': 'application/json' });

      const { originalCase, convertedText } = convertToCase(text, toCase);

      res.end(JSON.stringify({
        originalCase,
        targetCase: toCase,
        originalText: text,
        convertedText,
      }));
    }
  });
};

module.exports = { createServer };
