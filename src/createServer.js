const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');
const { validateRequest } = require('./convertToCase/validateRequest');

const createServer = () => {
  const server = http.createServer((req, res) => {
    const normalizedURL = new URL(req.url, `http://${req.headers.host}`);
    const { pathname, searchParams } = normalizedURL;

    const originalText = pathname.slice(1);
    const targetCase = searchParams.get('toCase');
    const response = {
      originalText,
      targetCase,
    };
    const errorMessages = validateRequest(originalText, targetCase);

    try {
      Object.assign(response, convertToCase(originalText, targetCase));
    } catch {
      if (targetCase) {
        /* eslint-disable-next-line max-len */
        errorMessages.push({ message: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.' });
      }
    }

    res.setHeader('Content-Type', 'application/json');

    if (errorMessages.length > 0) {
      res.statusCode = 400;
      res.end(JSON.stringify({ errors: errorMessages }));

      return;
    }

    res.statusCode = 200;
    res.end(JSON.stringify(response));
  });

  return server;
};

module.exports = {
  createServer,
};
