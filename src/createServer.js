const http = require('http');
const { validateRequest } = require('./validateRequest');
const { generateRespond } = require('./generateRespond');

function createServer() {
  const server = http.createServer((req, res) => {
    try {
      const normalizedUrl = new URL(req.url, `http://${req.headers.host}`);

      const textToTransform = normalizedUrl.pathname.slice(1);
      const toCaseTransform = normalizedUrl.searchParams.get('toCase');
      const errors = validateRequest(textToTransform, toCaseTransform);

      if (errors.length) {
        const error = { errors };

        res.writeHead(400, 'Bad request', {
          'content-type': 'application/json',
        });
        res.end(JSON.stringify(error));

        return;
      }

      const resultRespond = generateRespond(textToTransform, toCaseTransform);

      res.writeHead(200, 'OK', {
        'content-type': 'application/json',
      });
      res.end(JSON.stringify(resultRespond));
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  });

  return server;
};

module.exports = { createServer };
