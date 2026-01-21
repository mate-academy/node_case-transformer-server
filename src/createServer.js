const http = require('http');
const getUrlErrors = require('./getUrlErrors').getUrlErrors;
const convertToCase
  = require('./convertToCase/convertToCase').convertToCase;

function createServer() {
  const server = http.createServer((req, res) => {
    const parts = req.url.split('?');
    const originalText = parts[0].slice(1);
    const params = new URLSearchParams(parts[1]);
    const targetCase = params.get('toCase');

    res.setHeader('Content-Type', 'application/json');

    const errors = getUrlErrors(originalText, targetCase);

    if (errors.length !== 0) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';

      const errorBody = JSON.stringify({ errors });

      return res.end(errorBody);
    }

    const { originalCase, convertedText } = convertToCase(
      originalText,
      targetCase,
    );

    res.statusCode = 200;
    res.statusMessage = 'OK';

    const body = JSON.stringify({
      originalCase,
      targetCase,
      originalText,
      convertedText,
    });

    res.end(body);
  });

  return server;
}

module.exports.createServer = createServer;
