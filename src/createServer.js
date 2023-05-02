const http = require('http');
const { catchError } = require('./catchError');
const { getUrlParams } = require('./getUrlParams');
const { convertToCase } = require('./convertToCase/convertToCase');

function createServer() {
  return http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const [urlText, urlQuery] = req.url.split('?');
    const { originalText, targetCase } = getUrlParams(urlText, urlQuery);

    const errors = catchError(originalText, targetCase);

    if (errors.length) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';

      res.end(JSON.stringify({ errors }));

      return;
    }

    const {
      originalCase,
      convertedText,
    } = convertToCase(originalText, targetCase);

    res.statusCode = 200;
    res.statusMessage = 'OK';

    res.end(JSON.stringify(
      {
        originalCase,
        targetCase,
        originalText,
        convertedText,
      },
      null,
      2,
    ));
  });
}

module.exports = { createServer };
