const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');
const { validate } = require('./validate');

function createServer() {
  const server = http.createServer((req, res) => {
    const query = req.url.split('?');
    const text = query[0].slice(1);
    const params = new URLSearchParams(query[1]);
    const toCase = params.get('toCase');
    const errors = validate(text, toCase);

    res.setHeader('Content-type', 'application/json');

    if (errors.length) {
      res.statusCode = 400;
      res.statusMessage = 'Bad Request';
      res.end(JSON.stringify({ errors }));

      return;
    }

    res.statusCode = 200;
    res.statusMessage = 'OK';

    const { originalCase, convertedText } = convertToCase(text, toCase);

    const responseObject = {
      originalCase,
      targetCase: toCase,
      originalText: text,
      convertedText,
    };

    res.end(JSON.stringify(responseObject));
  });

  return server;
}

module.exports = { createServer };
