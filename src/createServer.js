const http = require('http');
const { convertToCase } = require('./convertToCase');
const { handleErrors } = require('./handleError');

const createServer = () => {
  const server = http.createServer((req, res) => {
    const normalizedURL = new URL(req.url, `http://${req.headers.host}`);
    const targetCase = normalizedURL.searchParams.get('toCase');
    const originalText = normalizedURL.pathname.slice(1);

    const errors = handleErrors(originalText, targetCase);

    if (!errors.length) {
      const convertedData = convertToCase(originalText, targetCase);

      res.data = JSON.stringify({
        originalText,
        targetCase,
        ...convertedData,
      });
    } else {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      res.data = JSON.stringify({ errors });
    }

    res.setHeader('Content-Type', 'application/json');
    res.end(res.data);
  });

  return server;
};

module.exports = {
  createServer,
};
