const http = require('http');
const { convertToCase } = require('./convertToCase/');
const { checkErrors } = require('./checkErrors');

const createServer = () => {
  return http.createServer((req, res) => {
    const normilizedURL = new URL(req.url, `http://${req.headers.host}`);
    const originalText = normilizedURL.pathname.slice(1);
    const targetCase = normilizedURL.searchParams.get('toCase');

    res.setHeader('Content-Type', 'application/json');

    const errors = checkErrors(originalText, targetCase);

    if (errors.length) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      res.end(JSON.stringify({ errors }));

      return;
    }

    const converted = convertToCase(originalText, targetCase);

    res.end(JSON.stringify({
      targetCase,
      originalText,
      ...converted,
    }));
  });
};

module.exports = { createServer };
