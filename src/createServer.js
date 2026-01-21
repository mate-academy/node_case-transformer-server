const http = require('http');
const { convertToCase } = require('./convertToCase');
const responceOK = require('./server/responceOK');
const validation = require('./server/validation');
const responceError = require('./server/responceError');

const createServer = () => {
  const server = http.createServer((req, res) => {
    const [pathname, query] = req.url.split('?');
    const text = pathname.slice(1);

    const params = new URLSearchParams(query);
    const toCase = params.get('toCase');

    const errors = validation(text, toCase);

    if (errors.length > 0) {
      return responceError(res, errors);
    }

    const result = convertToCase(text, toCase);

    responceOK(res, result, toCase, text);
  });

  return server;
};

module.exports = { createServer };
