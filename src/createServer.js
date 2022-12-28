const http = require('http');
const { checkIfhasErrors } = require('./checkIfHasErrors');
const { convertToCase } = require('./convertToCase');

function createServer() {
  const server = http.createServer((req, res) => {
    res.setHeader('content-type', 'application/json');

    const arrWithPath = req.url.split('?');
    const originalText = arrWithPath[0].slice(1);
    const queryString = arrWithPath[1];

    const params = new URLSearchParams(queryString);
    const toCase = params.get('toCase');

    const errors = checkIfhasErrors(toCase, originalText);

    if (errors.length) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';

      res.end(JSON.stringify({
        errors,
      }));

      return;
    }

    const {
      originalCase, convertedText,
    } = convertToCase(originalText, toCase);

    const result = {
      originalCase,
      targetCase: toCase,
      originalText,
      convertedText,
    };

    res.statusCode = 200;
    res.statusMessage = 'OK';

    res.end(JSON.stringify(result));
  });

  return server;
}

module.exports.createServer = createServer;
