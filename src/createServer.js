const http = require('http');
const { validate } = require('./validate');
const { convertToCase } = require('./convertToCase');

const createServer = () => {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const normalizedURL = new URL(req.url, `http://${req.headers.host}`);
    const toCase = normalizedURL.searchParams.get('toCase');
    const textToConvert = normalizedURL.pathname.slice(1);

    const errorMessages = validate(textToConvert, toCase);

    if (errorMessages.errors.length) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';

      res.end(JSON.stringify(errorMessages));
    } else {
      res.statusCode = 200;
      res.statusMessage = 'OK';

      const convertedText = convertToCase(textToConvert, toCase);

      const data = {
        targetCase: toCase,
        originalText: textToConvert,
        ...convertedText,
      };

      res.end(JSON.stringify(data));
    }
  });

  return server;
};

module.exports = { createServer };
