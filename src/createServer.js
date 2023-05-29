const http = require('http');
// const { convertToCase } = require('./convertToCase/convertToCase');
const { validateRequire } = require('./validateRequire');
const { prepareResponseBody } = require('./prepareResponseBody');
const { getRequestData } = require('./getRequestData');

const createServer = () => {
  const server = http.createServer((req, res) => {
    const [originalText, targetCase] = getRequestData(req);
    const errors = validateRequire(originalText, targetCase);

    res.setHeader('Content-Type', 'application/json');
    res.statusCode = errors.length === 0 ? 200 : 400;

    if (errors.length === 0) {
      const responseBody = prepareResponseBody(originalText, targetCase);

      res.end(JSON.stringify(responseBody));
    } else {
      res.end(JSON.stringify({ errors }));
    }
  });

  return server;
};

module.exports = {
  createServer,
};
