const http = require('http');
const { convertToCase } = require('./convertToCase');
const { handleError } = require('./handleError.js');

function createServer() {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const [originalText, queryToCase] = req.url.slice(1).split('?');
    const searchParams = new URLSearchParams(queryToCase);
    const targetCase = searchParams.get('toCase');
    const errors = handleError(originalText, targetCase);

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

    const requestResult = {
      originalCase,
      targetCase,
      originalText,
      convertedText,
    };

    res.statusCode = 200;
    res.statusText = 'OK';
    res.end(JSON.stringify(requestResult));
  });

  return server;
}

module.exports = {
  createServer,
};
