const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');
const { handleErrors } = require('./handleErrors');

const createServer = () => {
  const server = http.createServer((req, res) => {
    const originalText = req.url.split('?').slice(0, 1).join('').slice(1);
    const queryString = req.url.split('?').slice(1).join('');
    const params = new URLSearchParams(queryString);
    const targetCase = params.get('toCase');
    const errors = handleErrors(originalText, targetCase);

    if (errors.length) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ errors }));
    } else {
      res.statusCode = 200;
      res.statusMessage = 'OK';
      res.setHeader('Content-Type', 'application/json');

      const convertedText = convertToCase(originalText, targetCase);

      res.end(JSON.stringify({
        ...convertedText,
        targetCase,
        originalText,
      }));
    }
  });

  return server;
};

module.exports = { createServer };
