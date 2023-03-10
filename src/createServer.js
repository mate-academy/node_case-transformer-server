const http = require('http');

const { convertToCase } = require('./convertToCase/convertToCase');
const { handleErrors } = require('./handleErrors');

function createServer() {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const normalizedURL = new URL(req.url, `http://${req.headers.host}`);
    const originalText = normalizedURL.pathname.slice(1);
    const targetCase = normalizedURL.searchParams.get('toCase');
    const errors = handleErrors(originalText, targetCase);

    if (errors.length) {
      req.statusCode = 400;

      return res.end(JSON.stringify({ errors }));
    }

    const {originalCase, convertedText} = convertToCase(originalText, targetCase);

     res.end(JSON.stringify({
      originalCase,
      convertedText,
      originalText,
      targetCase,
    }));
  });

  return server;
}


module.exports = {
  createServer,
};
