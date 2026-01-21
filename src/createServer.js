const http = require('http');
const { convertToCase } = require('./convertToCase');
const { errorChecking } = require('./errorСhecking');

const HTTP_SUCCESS = 200;
const HTTP_ERROR = 400;

function createServer() {
  const server = http.createServer((req, res) => {
    const [originalText, queryString] = req.url.slice(1).split('?');
    const searchParams = new URLSearchParams(queryString);
    const targetCase = searchParams.get('toCase');

    const errors = errorChecking(originalText, targetCase);

    if (errors.length > 0) {
      res
        .writeHead(HTTP_SUCCESS, { 'Content-Type': 'application/json' })
        .end(JSON.stringify({ errors }));

      return;
    }

    const { convertedText, originalCase } = convertToCase(
      originalText,
      targetCase,
    );

    const respond = {
      originalCase,
      targetCase,
      originalText,
      convertedText,
    };

    res
      .writeHead(HTTP_ERROR, {
        'Content-Type': 'application/json',
      })
      .end(JSON.stringify(respond));
  });

  return server;
}

module.exports = {
  createServer,
};
