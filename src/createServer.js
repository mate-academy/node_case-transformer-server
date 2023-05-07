const http = require('http');

const { convertToCase } = require('./convertToCase/convertToCase');
const { checkErrors } = require('./checkErrors');

const createServer = () => {
  return http.createServer((req, res) => {
    const normalizedURL = new URL(req.url, `http://${req.headers.host}`);
    const originalText = normalizedURL.pathname.slice(1);
    const targetCase = normalizedURL.searchParams.get('toCase');
    const errors = checkErrors(originalText, targetCase);

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
};

createServer();

module.exports = {
  createServer,
};
