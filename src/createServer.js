const http = require('http');
const { convertToCase } = require('./convertToCase');
const { validateData } = require('./validateData');

function createServer() {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const [originalText, query] = req.url.slice(1).split('?');
    const params = new URLSearchParams(query);

    const { errors, targetCase } = validateData(params, originalText);

    if (errors.length) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      res.end(JSON.stringify({ errors }));
    } else {
      const {
        originalCase,
        convertedText,
      } = convertToCase(originalText, targetCase);
      const response = {
        originalCase,
        targetCase,
        originalText,
        convertedText,
      };

      res.statusCode = 200;
      res.statusMessage = 'OK';
      res.end(JSON.stringify(response));
    }
  });

  return server;
}

module.exports = {
  createServer,
};
