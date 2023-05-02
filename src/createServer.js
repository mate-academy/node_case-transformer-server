const http = require('http');
const { validateUrl } = require('./validateUrl');
const { convertToCase } = require('./convertToCase');

const createServer = () => {
  const server = http.createServer((req, res) => {
    const normalizedUrl = new URL(req.url, `http://${req.headers.host}`);
    const { pathname, searchParams } = normalizedUrl;

    const text = pathname.slice(1);
    const toCase = searchParams.get('toCase');

    const errors = validateUrl(text, toCase);

    if (errors.length) {
      res.statusCode = 400;
      res.statusMessage = 'Bad Request';
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ errors }));

      return;
    }

    const convertedData = convertToCase(text, toCase);

    res.statusCode = 200;
    res.statusMessage = 'OK';
    res.setHeader('Content-Type', 'application/json');

    res.end(JSON.stringify({
      ...convertedData,
      targetCase: toCase,
      originalText: text,
    }));
  });

  return server;
};

module.exports = { createServer };
