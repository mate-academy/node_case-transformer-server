const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');
const { validateUrl } = require('./validateUrl');

function createServer() {
  const server = http.createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const originalText = url.pathname.slice(1);
    const targetCase = url.searchParams.get('toCase');
    const requestErrors = validateUrl(originalText, targetCase);

    res.setHeader('Content-Type', 'application/json');

    if (!requestErrors.errors.length) {
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
      res.statusCode = 404;
      res.statusMessage = 'Bad request';

      res.end(JSON.stringify(requestErrors));
    }
  });

  return server;
}

module.exports.createServer = createServer;
