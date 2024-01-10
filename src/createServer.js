const http = require('http');
const { getArgsFromUrl } = require('./getArgsFromUrl');
const { validateRequest } = require('./validateRequest');

const createServer = () => {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const errors = [];

    const caseConversionInfo = validateRequest(errors, getArgsFromUrl(req.url));

    if (errors.length) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';

      res.write(JSON.stringify({
        errors,
      }));
    } else {
      res.statusCode = 200;

      res.write(JSON.stringify(caseConversionInfo));
    }

    res.end();
  });

  return server;
};

module.exports = { createServer };
