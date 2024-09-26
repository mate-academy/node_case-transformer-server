const http = require('http');
const { convertToCase } = require('./convertToCase');
const { validate } = require('./validate');

const createServer = () => {
  return http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const normalizedURL = new URL(req.url, `http://${req.headers.host}`);

    const text = normalizedURL.pathname.slice(1);
    const { toCase } = Object.fromEntries(normalizedURL.searchParams.entries());

    const errorObject = validate(text, toCase);

    if (errorObject.errors.length) {
      res.statusCode = 400;
      res.end(JSON.stringify(errorObject));
    }

    if (!errorObject.errors.length) {
      try {
        const convertResult = convertToCase(text, toCase);

        res.statusCode = 200;

        const body = {
          originalCase: convertResult.originalCase,
          targetCase: toCase,
          originalText: text,
          convertedText: convertResult.convertedText,
        };

        res.end(JSON.stringify(body));
      } catch (error) {
        res.statusCode = 400;
        res.end(JSON.stringify(errorObject));
      }
    }
  });
};

module.exports = {
  createServer,
};
