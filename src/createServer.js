const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase.js');

const { validation } = require('./validation');

const createServer = () => {
  const server = http.createServer((req, resp) => {
    resp.setHeader('Content-Type', 'application/json');

    const some = req.url.split('?');
    const params = new URLSearchParams(some[1]);

    const text = some[0].slice(1);
    const toCase = params.get('toCase');

    const error = validation(text, toCase);

    if (error.errors.length > 0) {
      resp.statusCode = 400;

      resp.end(JSON.stringify({
        errors: error.errors,
      }));

      return;
    }

    const { convertedText, originalCase } = convertToCase(text, toCase);

    resp.statusCode = 200;

    const data = JSON.stringify({
      convertedText,
      originalCase,
      originalText: text,
      targetCase: toCase,
    });

    resp.end(data);
  });

  return server;
};

module.exports = {
  createServer,
};
