const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');
const { checkForErrors } = require('./checkForErrors');

function createServer() {
  const server = http.createServer((req, res) => {
    const [endpoint, queryParams] = req.url.split('?');
    const textToConvert = endpoint.slice(1);
    const params = new URLSearchParams(queryParams);
    const toCase = params.get('toCase');

    res.setHeader('Content-Type', 'application/json');

    const respondErrors = checkForErrors(textToConvert, toCase);

    if (respondErrors.length) {
      res.statusCode = 404;
      res.statusMessage = 'Bad request';

      res.end(JSON.stringify({
        errors: respondErrors,
      }));
    } else {
      const result = convertToCase(textToConvert, toCase);

      res.statusCode = 200;
      req.statusMessage = 'OK';

      res.end(JSON.stringify({
        originalCase: result.originalCase,
        targetCase: toCase,
        originalText: textToConvert,
        convertedText: result.convertedText,
      }));
    }
  });

  return server;
}

module.exports.createServer = createServer;
