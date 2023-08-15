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

    try {
      if (errorObject.errors.length) {
        throw new Error(JSON.stringify(errorObject));
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
    } catch (error) {
      res.statusCode = 400;

      res.end(error.message);
    }
  });

  newServer.on('error', (err) => {
    throw err;
  });

  return newServer;
}

module.exports = { createServer };
