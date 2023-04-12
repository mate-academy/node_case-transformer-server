const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');
const { detectCase } = require('./convertToCase/detectCase');
const { getErrors } = require('./getErrors');

function createServer() {
  const server = http.createServer((req, res) => {
    res.writeHead(200, 'ok', { 'Content-Type': 'application/json' });

    const url = req.url;
    const arrOfUrlParts = url.split('?');

    const originalText = arrOfUrlParts[0].slice(1);
    const params = new URLSearchParams(arrOfUrlParts[1]);
    const toCase = params.get('toCase');

    const errors = getErrors(originalText, toCase);

    if (errors.length) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';

      res.end(JSON.stringify({
        errors,
      }));

      return;
    }

    const {
      originalCase,
      convertedText,
    } = convertToCase(originalText, toCase);

    const targetCase = detectCase(convertedText);

    const data = {
      originalCase,
      targetCase,
      originalText,
      convertedText,
    };

    res.end(JSON.stringify(data));
  });

  return server;
};

module.exports = { createServer };
