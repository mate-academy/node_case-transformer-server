const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');
const { validation } = require('./validation')

function createServer() {

  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;
    res.statusMessage = 'OK';


    const normalizedURL = new URL(req.url, `http://${req.headers.host}`);
    const targetCase = normalizedURL.searchParams.get('toCase');
    const originalText = normalizedURL.pathname.slice(1);

    const errors = validation(originalText, targetCase);

    if (errors.length) {
      res.statusCode = 400
      res.statusMessage = 'Bad request';


      res.end(JSON.stringify({ errors }));

      return;
    }

    const {
      originalCase,
      convertedText,
    } = convertToCase(originalText, targetCase);

    res.end( JSON.stringify({
      originalCase,
      targetCase,
      originalText,
      convertedText,
    }))


  });

  return server;
}

module.exports = { createServer };
