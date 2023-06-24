const http = require('http');
const { checkValidation } = require('./checkValidation');
const { convertToCase } = require('./convertToCase');

const createServer = () => {
  const server = http.createServer((req, res) => {
    const normalizedURL = new URL(req.url, `http://${req.headers.host}`);
    const toCase = normalizedURL.searchParams.get('toCase');
    const text = normalizedURL.pathname.slice(1);
    const error = checkValidation(text, toCase);

    res.setHeader('Content-Type', 'application/json');

    if (error.length) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';

      res.end(JSON.stringify({ errors: error }));
    }

    if (!error.length) {
      const transformedText = convertToCase(text, toCase);

      res.statusCode = 200;
      res.statusMessage = 'Ok';

      const response = {
        ...transformedText,
        targetCase: toCase,
        originalText: text,
      };

      res.end(JSON.stringify(response));
    }
  });

  return server;
};

module.exports = { createServer };
