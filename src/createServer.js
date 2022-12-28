const http = require('http');
const { convertToCase } = require('./convertToCase/');
const { writeErrorMessage } = require('./writeErrorMessage');

const createServer = () => {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const textToConvert = req.url.split('?')[0].slice(1);
    const query = req.url.split('?')[1];
    const params = new URLSearchParams(query);
    const toCase = params.get('toCase');
    const errors = writeErrorMessage(textToConvert, toCase);

    if (errors.length > 0) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';

      const responseError = {
        errors,
      };

      res.end(JSON.stringify(responseError));

      return;
    }

    const {
      originalCase, convertedText,
    } = convertToCase(textToConvert, toCase);

    const dataText = {
      originalCase,
      targetCase: toCase,
      originalText: textToConvert,
      convertedText,
    };

    res.end(JSON.stringify(dataText));
  });

  return server;
};

module.exports = { createServer };
