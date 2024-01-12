const http = require('http');
const { convertToCase } = require('./convertToCase');
const { wordsToCase } = require('./convertToCase/wordsToCase');

const REQUIRE_TEXT_MESSAGE = 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';
const TOCASE_MISSING = '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';
const TOCASE_NOT_ALLOWED = 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.';
const BAD_REQUEST = 'Bad request';

const CaseName = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

const PORT = process.env.PORT || 5700;

function createServer() {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    if (req.url === '/favicon.ico') {
      res.writeHead(204, { 'Content-Type': 'image/x-icon' });
      res.end();
      return;
    }

    const normalizedURL = new URL(req.url.slice(1), `http://localhost:${PORT}`);

    const originalText = normalizedURL.pathname.slice(1);
    const targetCase = normalizedURL.searchParams.get('toCase');

    const errorsObj = { 'errors': [] };

    if (!originalText) {
      errorsObj.errors.push({ 'message': REQUIRE_TEXT_MESSAGE });
    }

    if (!targetCase) {
      errorsObj.errors.push({ 'message': TOCASE_MISSING });
    }

    if (targetCase && (!CaseName.includes(targetCase))) {
      errorsObj.errors.push({ 'message': TOCASE_NOT_ALLOWED });
    }

    if (errorsObj.errors.length) {
      res.statusCode = 400;
      res.statusMessage = BAD_REQUEST;
      res.end(JSON.stringify(errorsObj));
    } else {
      const { originalCase, convertedText } = convertToCase(originalText, targetCase);

      const result = {
        originalCase,
        targetCase,
        originalText,
        convertedText,
      };

      res.statusCode = 200;
      res.statusMessage = 'OK';
      console.log(result);
      res.end(JSON.stringify(result));
    }

  });

  return server;
}

module.exports = {
  createServer
}
