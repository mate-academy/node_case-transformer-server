const http = require('http');
const { validate } = require('./validate');
const { convertToCase } = require('./convertToCase');

const createServer = () => {
  return http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const normalizedURL = new URL(req.url, `http://${req.headers.host}`);
    const toCase = normalizedURL.searchParams.get('toCase');
    const textToConvert = normalizedURL.pathname.slice(1);

    const errorMessages = validate(toCase, textToConvert);

    if (errorMessages.errors.length) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      res.end(JSON.stringify(errorMessages));
    } else {
      res.statusCode = 200;

      const transformedText = convertToCase(textToConvert, toCase);
      const data = {
        ...transformedText,
        targetCase: toCase,
        originalText: textToConvert,
      };

      res.end(JSON.stringify(data));
    }
  });
};

module.exports = { createServer };
