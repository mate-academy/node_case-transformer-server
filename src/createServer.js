const { convertToCase } = require('./convertToCase');
const { validate } = require('./validate');
const http = require('http');

function createServer() {
  const server = http.createServer((req, res) => {
    const { url } = req;

    res.setHeader('Content-Type', 'application/json');

    const splitedUrl = url.slice(1).split('?');

    const queryParamsString = splitedUrl[1];
    const originalText = splitedUrl[0];

    const params = new URLSearchParams(queryParamsString);
    const toCase = params.get('toCase');

    const error = validate(originalText, toCase);

    if (error) {
      res.statusText = 'Bad request';
      res.statusCode = 400;

      return res.end(JSON.stringify(error));
    }

    const { originalCase, convertedText }
      = convertToCase(originalText, toCase);

    res.statusCode = 200;
    res.statusText = 'OK';

    return res.end(JSON.stringify(
      {
        originalCase,
        targetCase: toCase,
        originalText,
        convertedText,
      },
    ));
  });

  return server;
}

module.exports = {
  createServer,
};
