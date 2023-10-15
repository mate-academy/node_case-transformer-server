const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');
const { validateData } = require('./validateData');

function createServer() {
  return http.createServer((req, res) => {
    const url = new URL(`http://${req.headers.host}${req.url}`);
    const originalText = url.pathname.slice(1);
    const targetCase = url.searchParams.get('toCase');

    const errors = validateData(originalText, targetCase);

    res.setHeader('Content-Type', 'application/json');

    if (errors.length) {
      res.statusCode = 400;
      res.statusText = 'Bad request';

      res.end(JSON.stringify({ errors }));

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

    res.end(JSON.stringify(successPayLoad));
  });
}

createServer();

module.exports = {
  createServer,
};
