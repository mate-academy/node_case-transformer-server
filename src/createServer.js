const http = require('http');
const { validation } = require('./validation.js');
const { convertToCase } = require('./convertToCase/convertToCase.js');

const createServer = () => {
  return http.createServer((req, res) => {
    const normalizedURL = new URL(req.url, `http://${req.headers.host}`);

    res.setHeader('Content-type', 'application/json');

    const errors = validation(normalizedURL.pathname, normalizedURL);

    if (errors.length) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';

      return res.end(JSON.stringify({ errors }));
    }

    const targetCase = normalizedURL.searchParams.get('toCase');
    const originalText = normalizedURL.pathname.slice(1);

    const { originalCase, convertedText } = convertToCase(
      originalText, targetCase,
    );

    res.statusCode = 200;
    res.statusMessage = 'OK';

    res.end(JSON.stringify({
      originalCase,
      targetCase,
      originalText,
      convertedText,
    }));
  });
};

module.exports = { createServer };
