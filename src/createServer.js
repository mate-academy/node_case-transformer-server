const http = require('http');
const url = require('url');
const { convertToCase } = require('./convertToCase');
const { BASE_URL, PORT } = require('./config');
const { inputValidation } = require('./inputValidation');

const createServer = () => {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const { pathname, searchParams } = new url.URL(
      req.url,
      `${BASE_URL}:${PORT}`,
    );

    const originalText = pathname.slice(1);
    const toCase = searchParams.get('toCase');

    const { isValid, errorBody } = inputValidation(originalText, toCase);

    if (!isValid) {
      res.statusCode = 400;

      return res.end(JSON.stringify(errorBody));
    }

    res.statusCode = 200;

    const { originalCase, convertedText } = convertToCase(originalText, toCase);

    res.end(
      JSON.stringify({
        originalCase,
        targetCase: toCase,
        convertedText,
        originalText,
      }),
    );
  });

  return server;
};

module.exports = {
  createServer,
};
