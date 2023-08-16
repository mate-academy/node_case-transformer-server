const http = require('http');
const { getUrlErrMessages } = require('./urlCheck');
const { convertToCase } = require('./convertToCase/convertToCase');

function createServer() {
  const newServer = http.createServer((req, res) => {
    res.setHeader('Content-type', 'application/json');
    res.statusCode = 200;

    const errorObject = {
      errors: getUrlErrMessages(req.url),
    };

    const urlParts = req.url.split('?');

    if (errorObject.errors.length) {
      res.statusCode = 400;

      res.end(JSON.stringify(errorObject));

      return;
    }

    res.statusCode = 200;

    const text = urlParts[0].slice(1);

    const searchParams = new URLSearchParams(urlParts[1]);
    const toCase = searchParams.get('toCase');

    const responseBody = {
      ...convertToCase(text, toCase),
      targetCase: toCase,
      originalText: text,
    };

    res.end(JSON.stringify(responseBody));
  });

  return newServer;
}

module.exports = { createServer };
