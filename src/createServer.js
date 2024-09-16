const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');
const { getParams } = require('./getParams');
const { getErrors } = require('./getErrors');

function createServer() {
  return http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const [strQuery, targetCase] = getParams(req.url, req.headers.host);

    const errors = getErrors(strQuery, targetCase);

    if (errors.length > 0) {
      res.statusCode = 400;
      res.statusMessage = 'Bad Request';

      res.end(JSON.stringify({ errors }));

      return;
    }

    const convertedText = convertToCase(strQuery, targetCase);

    const result = {
      ...convertedText,
      targetCase,
      originalText: strQuery,
    };

    res.statusCode = 200;
    res.statusMessage = 'OK';

    res.end(JSON.stringify(result));
  });
}

module.exports = { createServer };
