const http = require('http');
const { convertToCase } = require('./convertToCase');
const { validateURL } = require('./validateURL');

const createServer = () => {
  return http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const normalizedURL = new URL(req.url, `http://${req.headers.host}`);
    const toCase = normalizedURL.searchParams.get('toCase');
    const textToConvert = normalizedURL.pathname.slice(1);

    const error = validateURL(toCase, textToConvert);

    if (error.length) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      res.end(JSON.stringify({ errors: error }));

      return;
    }

    res.statusCode = 200;
    res.statusMessage = 'OK';

    const {
      originalCase,
      convertedText,
    } = convertToCase(textToConvert, toCase);

    const data = {
      originalCase,
      targetCase: toCase,
      originalText: textToConvert,
      convertedText,
    };

    res.end(JSON.stringify(data));
  });
};

module.exports = {
  createServer,
};
