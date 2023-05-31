const http = require('http');
const { errorValidation } = require('./errorValidation');
const { convertToCase } = require('./convertToCase/convertToCase');

const createServer = () => {
  const server = http.createServer((req, res) => {
    const splitUrl = req.url.split('?');
    const path = splitUrl[0];
    const textToConvert = path.slice(1);
    const queryStr = splitUrl[1];
    const params = new URLSearchParams(queryStr);
    const toCase = params.get('toCase');
    const checkError = errorValidation(textToConvert, toCase);
    const hasError = checkError.errors.length > 0;

    res.setHeader('Content-Type', 'application/json');
    res.statusCode = hasError ? 400 : 200;
    res.statusMessage = hasError ? 'Bad Request' : 'OK';

    if (checkError.errors.length) {
      res.end(JSON.stringify(checkError));
    } else {
      const result = convertToCase(textToConvert, toCase);

      const responce = {
        originalCase: result.originalCase,
        targetCase: toCase,
        originalText: textToConvert,
        convertedText: result.convertedText,
      };

      res.end(JSON.stringify(responce));
    }
  });

  return server;
};

module.exports = { createServer };
