const http = require('http');
const { convertToCase } = require('./convertToCase');
const { validateData } = require('./helpers/validateData');

const createServer = () => {
  return http.createServer({}, (req, res) => {
    const normalizedURL = new URL(req.url, `http://${req.headers.host}`);
    const originalText = normalizedURL.pathname.slice(1);
    const targetCase = normalizedURL.search.split('=')[1];
    const errors = validateData(originalText, targetCase);

    res.setHeader('Content-Type', 'application/json');

    if (errors.length) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';

      res.end(JSON.stringify({ errors }));

      return;
    }

    const {
      originalCase,
      convertedText,
    } = convertToCase(originalText, targetCase);

    res.end(JSON.stringify({
      originalCase,
      convertedText1: convertedText,
      targetCase,
      originalText,
    }));
  });
};

module.exports = {
  createServer,
};
