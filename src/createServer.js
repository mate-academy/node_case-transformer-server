const http = require('http');
const { validateRequest } = require('./validateRequest');
const { generateRespond } = require('./generateRespond');

function createServer() {
  const faviconURL = '/favicon.ico';

  const server = http.createServer((req, res) => {
    try {
      const normalizedUrl = new URL(req.url, `http://${req.headers.host}`);

      if (normalizedUrl.pathname === faviconURL) {
        res.end();

        return;
      }

      const textToTransform = normalizedUrl.pathname.slice(1);
      const toCaseTransform = normalizedUrl.searchParams.get('toCase');
      const isValidData = validateRequest(textToTransform, toCaseTransform);

      if (!isValidData.isValid) {
        const error = { errors: isValidData.errorArray };

        res.writeHead(400, 'Bad reguest', {
          'content-type': 'application/json',
        });
        res.write(JSON.stringify(error));
        res.end();

        return;
      }

      const resultRespond = generateRespond(textToTransform, toCaseTransform);

      res.writeHead(200, 'OK', {
        'content-type': 'application/json',
      });
      res.write(JSON.stringify(resultRespond));
      res.end();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  });

  return server;
};

module.exports = { createServer };
