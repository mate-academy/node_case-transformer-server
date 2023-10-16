const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');
const { validateData } = require('./validateData');

function createServer() {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const [originalText, queryString] = req.url
      .split('?')
      .map(query => query
        .replace('/', ''));
    const params = new URLSearchParams(queryString);
    const targetCase = params.get('toCase');
    const errors = validateData(originalText, targetCase);

    if (errors.length) {
      res.statusCode = 400;
      res.end(JSON.stringify({ errors }));

      return;
    }

    const {
      originalCase,
      convertedText,
    } = convertToCase(originalText, targetCase);

    res.end(JSON.stringify({
      originalCase,
      targetCase,
      convertedText,
      originalText,
    }));
  });

  return server;
}

module.exports = {
  createServer,
};
