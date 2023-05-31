const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');
const { validation } = require('./validation');

const createServer = () => {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const normalizedURL = new URL(req.url, `http://${req.headers.host}`);
    const pathname = normalizedURL.pathname.slice(1);
    const toCase = normalizedURL.searchParams.get('toCase');
    const errors = validation(pathname, toCase);

    if (errors.length) {
      req.statusCode = 400;
      req.statusMessage = 'Bad request';
      res.end(JSON.stringify({ errors }));
    } else {
      const convertedPathName = convertToCase(pathname, toCase);

      // eslint-disable-next-line no-console
      console.log(`Successful conversion from ${convertedPathName.originalCase} to ${toCase}`);

      res.end(JSON.stringify({
        originalCase: convertedPathName.originalCase,
        targetCase: toCase,
        originalText: pathname,
        convertedText: convertedPathName.convertedText,
      }));
    }
  });

  return server;
};

module.exports = { createServer };
