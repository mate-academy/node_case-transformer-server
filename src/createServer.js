const http = require('http');
const { validateError } = require('./validateError');
const { convertToCase } = require('./convertToCase/convertToCase');

const createServer = () => {
  return http.createServer((req, res) => {
    const normilizedURL = new URL(req.url, `http://${req.headers.host}`);
    const originalText = normilizedURL.pathname.slice(1);
    const targetCase = normilizedURL.searchParams.get('toCase');

    res.setHeader('Content-Type', 'application/json');

    const errors = validateError(originalText, targetCase);

    if (errors.length !== 0) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      res.end(JSON.stringify({ errors }));

      return;
    }

    const convertedText = convertToCase(originalText, targetCase);

    res.end(JSON.stringify({
      originalText,
      targetCase,
      ...convertedText,
    }));
  });
};

module.exports = {
  createServer,
};
