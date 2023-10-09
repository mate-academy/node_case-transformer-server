const http = require('http');
const { getErrors } = require('./getErrors');
const { convertToCase } = require('./convertToCase');

function createServer() {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const currentURL = new URL('htto://' + req.url);
    const reqText = currentURL.pathname.slice(1);
    const reqCase = currentURL.searchParams.get('toCase');
    const errors = getErrors(reqText, reqCase);

    if (!errors.length) {
      const {
        convertedText,
        originalCase,
      } = convertToCase(reqText, reqCase);

      const convertResult = {
        originalCase,
        targetCase: reqCase,
        originalText: reqText,
        convertedText,
      };

      res.end(JSON.stringify(convertResult));
    } else {
      res.end(JSON.stringify({ errors }));
    }
  });

  return server;
}

module.exports = {
  createServer,
};
