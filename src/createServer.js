const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase.js');
const { validateURL } = require('./validateURL.js');

const createServer = () => {
  const server = http.createServer((req, resp) => {
    const normalizedURL = new URL(req.url, `http://${req.headers.host}`);
    const targetCase = normalizedURL.searchParams.get('toCase');
    const originalText = req.url.split('?')[0].slice(1);
    const validationResult = validateURL(originalText, targetCase);

    resp.setHeader('Content-Type', 'application/json');
    // eslint-disable-next-line no-console
    console.log(JSON.stringify(validationResult));

    if (validationResult === 'valid') {
      const {
        originalCase,
        convertedText,
      } = convertToCase(originalText, targetCase);

      resp.statusCode = 200;
      resp.statusMessage = 'OK';

      resp.end(JSON.stringify({
        originalCase,
        targetCase,
        originalText,
        convertedText,
      }));
    } else {
      resp.statusCode = 400;
      resp.statusMessage = 'Bad request';

      resp.end(JSON.stringify(validationResult));
    }
  });

  return server;
};

module.exports = { createServer };
