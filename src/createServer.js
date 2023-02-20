const http = require('http');
const { convertToCase } = require('./convertToCase');
const { urlValidate } = require('./urlValidate');

function createServer() {
  // const server = http.createServer((req, res) => {
  return http.createServer((req, res) => {
    const normalizedUrl = new URL(req.url, `http://${req.headers.host}`);
    const text = normalizedUrl.pathname.slice(1);
    const instance = normalizedUrl.searchParams.get('toCase');
    const errors = urlValidate(text, instance);

    res.setHeader('content-type', 'application/json');

    if (errors.length > 0) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      res.end(JSON.stringify({ errors }));

      return;
    }

    const resultRequest = convertToCase(text, instance);

    res.statusCode = 200;
    res.statusMessage = 'OK';

    res.end(JSON.stringify({
      ...resultRequest,
      originalText: text,
      targetCase: instance,
    }));
  });

  // return server;
}

// const server = createServer();

// server.listen(3000, () => {
//   console.log('Server listening on port 3000');
// });

createServer();

module.exports.createServer = createServer;
