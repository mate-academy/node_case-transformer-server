const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');
const { detectErrors } = require('./detectErrors');

const createServer = () => {
  const server = http.createServer((req, res) => {
    const splitedUrl = req.url.split('?');
    const search = new URLSearchParams(splitedUrl[1]);
    const targetCase = search.get('toCase');
    const originalText = splitedUrl[0].slice(1);
    const errors = detectErrors(originalText, targetCase);

    if (errors.length) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      res.setHeader('Content-Type', 'application/json');

      res.end(JSON.stringify({
        errors,
      }));

      return;
    }

    res.statusCode = 200;
    res.statusMessage = 'OK';
    res.setHeader('Content-Type', 'application/json');

    const convertedText = convertToCase(originalText, targetCase);

    res.end(JSON.stringify({
      ...convertedText,
      targetCase,
      originalText,
    }));
  });

  return server;
};

module.exports = { createServer };
