const http = require('http');
const { convertToCase } = require('./convertToCase/');
const { checkUrlParams } = require('./checkUrlParams');
const { getUrlParams } = require('./getUrlParams');

const createServer = () => {
  return http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const [text, query] = req.url.split('?');
    const { originalText, targetCase } = getUrlParams(text, query);

    const errors = checkUrlParams(originalText, targetCase);

    if (errors.length) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      res.end(JSON.stringify({ errors }));

      return;
    }

    const {
      originalCase, convertedText,
    } = convertToCase(originalText, targetCase);

    res.end(JSON.stringify({
      originalCase,
      targetCase,
      originalText,
      convertedText,
    }));
  });
};

module.exports = { createServer };
