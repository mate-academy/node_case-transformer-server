const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');
const { checkUrl } = require('./checkUrl');
const { getParams } = require('./getParams');

const createServer = () => {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const [text, query] = req.url.split('?');
    const { originalText, targetCase } = getParams(text, query);

    const errors = checkUrl(originalText, targetCase);

    if (errors.length) {
      res.statusCode = 404;
      res.statusMessage = 'Bad request';

      res.end(JSON.stringify({
        errors,
      }));

      return;
    }

    const {
      originalCase,
      convertedText,
    } = convertToCase(originalText, targetCase);

    res.statusCode = 200;
    res.statusMessage = 'OK';

    const response = JSON.stringify({
      originalCase,
      targetCase,
      originalText,
      convertedText,
    });

    res.end(response);
  });

  return server;
};

module.exports = { createServer };
