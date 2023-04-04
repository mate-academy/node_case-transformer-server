const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');
const config = require('./config');

function createServer() {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const { originalText, caseParams, targetCase }
    = config.getRequestParams(req);
    const { cases, errors } = config;

    const errorsArr = [];

    if (!originalText) {
      errorsArr.push(errors.textIsMissing);
    };

    if (caseParams[0] !== 'toCase') {
      errorsArr.push(errors.toCaseIsMissing);
    } else if (!cases.includes(targetCase)) {
      errorsArr.push(errors.toCaseIsWrong);
    };

    if (errorsArr.length) {
      res.statusCode = 404;
      res.statusText = 'Bad request';
      res.end(JSON.stringify({ errorsArr }));

      return;
    };

    const { originalCase, convertedText } = convertToCase(
      originalText,
      targetCase,
    );

    res.statusCode = 200;

    res.end(
      JSON.stringify({
        originalCase,
        originalText,
        targetCase,
        convertedText,
      }),
    );
  });

  return server;
}

module.exports = { createServer };
