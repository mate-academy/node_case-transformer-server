const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');
const { getData } = require('./getData');
const { validateData } = require('./validateData');

function createServer() {
  const server = http.createServer((req, res) => {
    const { textToFormat, caseName } = getData(req);
    const errors = validateData(textToFormat, caseName);

    res.setHeader('Content-Type', 'application/json');

    if (errors.length) {
      res.statusCode = 400;
      res.statusMessage = 'Bad Request';

      return res.end(JSON.stringify({ errors }));
    };

    res.statusCode = 200;
    res.statusMessage = 'OK';

    const {
      originalCase,
      convertedText,
    } = convertToCase(textToFormat, caseName);

    res.end(JSON.stringify({
      originalCase,
      convertedText,
      targetCase: caseName,
      originalText: textToFormat,
    }));
  });

  return server;
}

module.exports = { createServer };
