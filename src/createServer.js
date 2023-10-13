const http = require('http');
const { convertToCase } = require('./convertToCase');
const { errorHandler } = require('./errorHandler');

function createServer() {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-type', 'application/json');

    const [originalText, queryString] = req.url.slice(1).split('?');
    const params = new URLSearchParams(queryString);
    const targetCase = params.get('toCase');
    const errors = errorHandler(originalText, targetCase);

    if (errors.length) {
      res.statusCode = 400;
      res.statusText = 'Bad request';
      res.end(JSON.stringify({ errors }));

      return;
    }

    const {
      originalCase,
      convertedText,
    } = convertToCase(originalText, targetCase);

    const response = {
      originalCase,
      targetCase,
      originalText,
      convertedText,
    };

    res.statusCode = 200;
    res.statusText = 'OK';
    res.end(JSON.stringify(response));
  });

  return server;
}

module.exports = {
  createServer,
};
