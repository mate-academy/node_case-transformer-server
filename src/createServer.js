const http = require('http');

const { convertToCase } = require('./convertToCase/convertToCase');
const { handleErrors } = require('./handleErrors');

function createServer() {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const normalizedURL = new URL(req.url, `http://${req.headers.host}`);
    const textToConvert = normalizedURL.pathname.slice(1);
    const toCase = normalizedURL.searchParams.get('toCase');
    const errors = handleErrors(textToConvert, toCase);

    if (errors.length) {
      req.statusCode = 400;
      req.statusMessage = 'Bad request';

      res.end(JSON.stringify(errors));

      return;
    }

    const convertedText = convertToCase(textToConvert, toCase);

    res.statusCode = 200;
    res.statusMessage = 'OK';

    res.end(JSON.stringify({
      ...convertedText,
      textToConvert,
      toCase,
    }));
  });

  return server;
}


module.exports = {
  createServer,
};
