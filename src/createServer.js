const http = require('http');
const validation = require('./server/validation');
const responseError = require('./server/responseError');
const responseOk = require('./server/responseOk');
const { convertToCase } = require('./convertToCase');

const createServer = () => {
  const server = http.createServer((req, res) => {
    const [pathname, query] = req.url.split('?');
    const text = pathname.slice(1);

    const params = new URLSearchParams(query);
    const toCase = params.get('toCase');

    const errors = validation(text, toCase);

    if (errors.length > 0) {
      return responseError(res, errors);
    }

    const result = convertToCase(text, toCase);

    responseOk(res, result, toCase, text);
  });

  return server;
};

module.exports = { createServer };
