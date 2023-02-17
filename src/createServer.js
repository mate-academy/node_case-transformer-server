const http = require('http');
const { validateData } = require('./validateData');
const { convertToCase } = require('./convertToCase/convertToCase');

const createServer = () => {
  const server = http.createServer((req, res) => {
    const normalizedURL = new URL(req.url, `http://${req.headers.host}`);
    const originalText = normalizedURL.pathname.slice(1);
    const targetCase = normalizedURL.searchParams.get('toCase');
    const errors = validateData(originalText, targetCase);

    res.setHeader('Content-Type', 'application/json');

    if (errors.length) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';

      res.end(JSON.stringify({
        errors,
      }));
    } else {
      const convertedText = convertToCase(originalText, targetCase);

      const serverResponse = {
        ...convertedText,
        originalText,
        targetCase,
      };

      res.statusCode = 200;
      res.statusMessage = 'OK';

      res.end(JSON.stringify(serverResponse));
    }
  });

  return server;
};

module.exports = {
  createServer,
};
