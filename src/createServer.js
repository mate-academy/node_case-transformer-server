const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');
const {
  ALLOWED_CASES,
  PORT,
} = require('./constatnts');
const { getError } = require('./getErrors');

function createServer() {
  const server = http.createServer((req, res) => {
    const url = new URL(req.url, `http://localhost:${PORT}`);

    res.setHeader('Content-Type', 'application/json');

    const textFromUrl = url.pathname.slice(1);
    const caseFromUrl = url.searchParams.get('toCase');
    const errors = getError(textFromUrl, caseFromUrl, ALLOWED_CASES);

    if (!errors.errors.length) {
      const {
        originalCase,
        convertedText,
      } = convertToCase(textFromUrl, caseFromUrl);

      const result = {
        originalCase,
        targetCase: caseFromUrl,
        originalText: textFromUrl,
        convertedText,
      };

      res.statusCode = 200;
      res.statusMessage = 'OK';
      res.end(JSON.stringify(result));
    } else {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      res.end(JSON.stringify(errors));
    }
  });

  return server;
}

module.exports = {
  createServer,
};
