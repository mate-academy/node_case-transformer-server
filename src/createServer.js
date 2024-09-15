const http = require('http');
const { getValidetedQueries } = require('./getValidatedQueries');
const { convertToCase } = require('./convertToCase/convertToCase');

const createServer = () => {
  return http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const normalizedUrl = new URL(req.url, 'http:/' + req.headers.host);
    const originalText = normalizedUrl.pathname.slice(1);
    const targetCase = normalizedUrl.searchParams.get('toCase');

    const errors = getValidetedQueries(originalText, targetCase);

    if (errors) {
      res.end(JSON.stringify(errors));
    }

    if (!errors) {
      const { originalCase, convertedText }
      = convertToCase(originalText, targetCase);

      res.end(JSON.stringify({
        originalCase,
        targetCase,
        originalText,
        convertedText,
      }));
    }
  });
};

module.exports = { createServer };
