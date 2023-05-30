
const http = require('http');
const { checkOnError } = require('./checkOnError');
const { createResponseBody } = require('./createResponseBody');
const { toSplitUrl } = require('./splitUrl');

function createServer() {
  const server = http.createServer((req, res) => {
    const queryString = req.url.split('?');
    const [text, targetCase] = toSplitUrl(queryString);
    const errorBody = checkOnError(text, targetCase);
    const hasError = errorBody.errors.length !== 0;

    res.setHeader('Content-Type', 'application/json');
    res.statusCode = hasError ? 400 : 200;
    res.statusMessage = hasError ? 'Bad request' : 'OK';

    if (hasError) {
      res.end(JSON.stringify(errorBody));
    } else {
      const responseBody = createResponseBody(text, targetCase);

      res.end(JSON.stringify(responseBody));
    }
  });

  return server;
}

module.exports = {
  createServer,
};
