const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase.js');
const { errorsHandler } = require('./errorsHandler.js');

function createServer() {
  return http.createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const pathName = url.pathname.slice(1).split('?')[0];
    const toCase = url.searchParams.get('toCase');

    if (pathName === 'favicon.ico') {
      res.writeHead(204);

      return res.end();
    }

    res.setHeader('Content-Type', 'application/json');

    let errors;

    try {
      errors = errorsHandler(pathName, toCase);

      if (errors.length > 0) {
        throw new Error();
      }

      const { convertedText, originalCase } = convertToCase(pathName, toCase);

      const resultRequest = {
        convertedText,
        originalCase,
        originalText: pathName,
        targetCase: toCase,
      };

      res.statusCode = 200;
      res.end(JSON.stringify(resultRequest));
    } catch {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      res.end(JSON.stringify({ errors }));
    }
  });
}

module.exports = { createServer };
