// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here

const http = require('http');
const { convertToCase } = require('./convertToCase');
const { validate } = require('./validation');

function createServer() {
  return http.createServer((req, res) => {
    const protocol = req.socket.encrypted ? 'https' : 'http';
    const hostName = `${protocol}://${req.headers.host}`;
    const parsedUrl = new URL(req.url, hostName);
    const pathname = parsedUrl.pathname.slice(1);
    const toCase = parsedUrl.searchParams.get('toCase');

    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;
    res.statusMessage = 'OK';

    const errors = validate(toCase, pathname);

    if (errors.length > 0) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';

      res.end(JSON.stringify({ errors }));

      return;
    }

    const response = convertToCase(pathname, toCase);

    response.targetCase = toCase;
    response.originalText = pathname;

    res.end(JSON.stringify(response));
  });
}

module.exports = {
  createServer,
};
