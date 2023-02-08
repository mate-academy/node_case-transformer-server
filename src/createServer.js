const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');
const { validateURL } = require('./validateURL');

function createServer() {
  const server = http.createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const originalText = url.pathname.slice(1);
    const targetCase = url.searchParams.get('toCase');
    const validationResult = validateURL(originalText, targetCase);

    res.setHeader('Content-Type', 'application/json');

    if (validationResult === 'valid URL') {
      const {
        originalCase,
        convertedText,
      } = convertToCase(originalText, targetCase);

      res.statusCode = 200;
      res.statusMessage = 'OK';

      res.end(JSON.stringify({
        originalCase,
        targetCase,
        originalText,
        convertedText,
      }));
    } else {
      res.statusCode = 400;
      res.statusMessage = 'Bed request';

      res.end(JSON.stringify(validationResult));
    }
  });

  return server;
}

module.exports.createServer = createServer;
