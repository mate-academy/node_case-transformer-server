const http = require('http');
const { validation } = require('./validation');
const { convertToCase } = require('./convertToCase');

const createServer = () => {
  const server = http.createServer((req, res) => {
    const splitUrl = req.url.split('?');

    const path = splitUrl[0];
    const textToConvert = path.slice(1);

    const queryString = splitUrl[1];
    const params = new URLSearchParams(queryString);

    const toCase = params.get('toCase');

    const errorsCheck = validation(textToConvert, toCase);
    const hasError = errorsCheck.errors.length > 0;

    res.setHeader('Content-Type', 'application/json');
    res.statusCode = hasError ? 400 : 200;
    res.statusMessage = hasError ? 'Bad Request' : 'OK';

    if (errorsCheck.errors.length) {
      res.end(JSON.stringify(errorsCheck));
    } else {
      const result = convertToCase(textToConvert, toCase);

      const response = {
        originalCase: result.originalCase,
        targetCase: toCase,
        originalText: textToConvert,
        convertedText: result.convertedText,
      };

      res.end(JSON.stringify(response));
    }
  });

  return server;
};

module.exports = { createServer };
