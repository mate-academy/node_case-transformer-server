const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');
const { Errors } = require('./Errors');

function createServer() {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const validURL = req.url.split('?');

    const params = new URLSearchParams(validURL[1]);

    const targetCase = params.get('toCase');

    const originalText = validURL[0].replace('/', '');

    const errors = Errors(originalText, targetCase);

    if (errors.length !== 0) {
      res.statusCode = 400;
      res.statusMessage = 'Incorrect request';

      return res.end(JSON.stringify({ errors }));
    }

    const { convertedText, originalCase }
     = convertToCase(originalText, targetCase);

    const preparedToShow = {
      convertedText,
      originalCase,
      originalText,
      targetCase,
    };

    res.statusCode = 200;
    res.statusMessage = 'OK';

    res.end(JSON.stringify(preparedToShow));
  });

  return server;
}

module.exports = { createServer };
