const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');
const { findErrors } = require('./errors');

function createServer() {
  const server = http.createServer((req, res) => {
    const normalizedURL = new URL(req.url, `http://${req.headers.host}`);
    const textToConvert = normalizedURL.pathname.slice(1);
    const targetCase = normalizedURL.searchParams.get('toCase');
    const errors = findErrors(textToConvert, targetCase);

    res.setHeader('Content-type', 'application/json');

    if (errors.length > 0) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';

      return res.end(JSON.stringify({
        errors,
      }));
    }

    const { originalCase,
      convertedText } = convertToCase(textToConvert, targetCase);

    const resData = {
      originalCase,
      targetCase,
      textToConvert,
      convertedText,
    };

    res.statusCode = 200;
    res.statusMessage = 'OK';

    res.end(JSON.stringify(resData));
  });

  return server.listen(8080);
};

createServer();

module.exports = {
  server: createServer,
};
