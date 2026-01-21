const http = require('http');
const { validateUrl } = require('./validateUrl');
const { respondPositively } = require('./validatedResponse');

function createServer() {
  const server = http.createServer((req, res) => {
    const fullUrl = `http://${req.headers.host}${req.url}`;
    const resultValid = validateUrl(fullUrl);

    if (!resultValid.valid) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(resultValid.errors));

      return;
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(respondPositively(fullUrl)));
  });

  return server;
}

module.exports = {
  createServer,
};
