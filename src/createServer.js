const http = require('http');
const { errorMessages } = require("./errorMessages");
const { convertToCase } = require('./convertToCase');
const { CASES } = require("./cases");

function createServer() {
  return http.createServer((req, res) => {
    const normalizedURL = new URL(req.url, `http://${req.headers.host}`);
    const originalText = normalizedURL.pathname.slice(1);
    const targetCase = normalizedURL.searchParams.get('toCase');
    const errors = [];

    res.setHeader('Content-Type', 'application/json');

    if (!originalText) {
      errors.push({ message: errorMessages.noOriginalText });
    }

    if (targetCase && !CASES.includes(targetCase)) {
      errors.push({ message: errorMessages.invalidCase });
    }

    if (!targetCase) {
      errors.push({ message: errorMessages.noOriginalCase })
    }

    if (errors.length) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      res.end(JSON.stringify({ errors }));

      return;
    }

    const {
      originalCase,
      convertedText
    } = convertToCase(originalText, targetCase);

    res.statusCode = 200;
    res.statusMessage = 'OK';

    res.end(JSON.stringify({
      originalCase,
      targetCase,
      convertedText,
      originalText,
    }));
  });
}

module.exports = { createServer };

