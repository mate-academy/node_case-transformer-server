const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');
const { validateData } = require('./validateData');

function createServer() {
  return http.createServer((req, res) => {
    const url = new URL(`http://${req.headers.host}${req.url}`);
    const originalText = url.pathname.slice(1);
    const targetCase = url.searchParams.get('toCase');

    const errors = validateData(originalText, targetCase);

    if (errors.length) {
      res.statusCode = 400;
      res.statusText = 'Bad request';
      res.setHeader('Content-Type', 'application/json');

      const errorPayload = { errors };

      res.end(JSON.stringify(errorPayload));

      return;
    }

    const { originalCase, convertedText } = convertToCase(
      originalText,
      targetCase,
    );

    const successPayLoad = {
      originalCase,
      targetCase,
      originalText,
      convertedText,
    };

    res.statusCode = 200;
    res.statusText = 'OK';
    res.setHeader('Content-Type', 'application/json');

    res.end(JSON.stringify(successPayLoad));
  });
}

createServer();

module.exports = {
  createServer,
};
