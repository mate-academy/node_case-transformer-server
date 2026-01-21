const http = require('http');
const { convertToCase } = require('./convertToCase');
const { validateUrl } = require('./validateUrl');

const createServer = () =>
  http.createServer((req, res) => {
    const normalizedURL = new URL(req.url, `http://${req.headers.host}`);
    const textToConvert = normalizedURL.pathname.slice(1);
    const toCase = normalizedURL.searchParams.get('toCase');

    const errors = validateUrl(normalizedURL);

    if (errors.length === 0) {
      const { originalCase, convertedText } = convertToCase(
        textToConvert,
        toCase,
      );

      res.writeHead(200, { 'Content-Type': 'application/json' });

      res.end(
        JSON.stringify({
          originalCase,
          targetCase: toCase,
          originalText: textToConvert,
          convertedText,
        }),
      );
    } else {
      res.writeHead(400, { 'Content-Type': 'application/json' });

      res.end(
        JSON.stringify({
          errors,
        }),
      );
    }
  });

module.exports = {
  createServer,
};
