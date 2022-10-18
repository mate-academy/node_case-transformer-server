const http = require('http');
const { convertToCase } = require('./convertToCase');

function createServer() {
  return http.createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const originalText = url.pathname.slice(1);
    const targetCase = url.searchParams.toCase;
    const cases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

    let error = false;
    let messageError = '';

    if (!targetCase) {
      error = true;

      messageError = '"toCase" query param is required. '
      + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';
    } else if (!(cases.includes(targetCase))) {
      error = true;

      messageError = 'This case is not supported. '
      + `Available cases: ${cases.join(', ')}.`;
    };

    if (!originalText) {
      error = true;

      messageError = 'Text to convert is required. '
      + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';
    };

    res.setHeader('Content-type', 'application/json');

    if (error) {
      res.statusCode = 400;
      res.statusText = 'Bad request';

      res.end(JSON.stringify({
        messageError,
      }));

      return;
    }

    const { originalCase, convertedText } = convertToCase(
      originalText,
      targetCase,
    );

    res.statusCode = 200;

    res.end(JSON.stringify({
      originalCase,
      targetCase,
      originalText,
      convertedText,
    }));
  });
};

module.exports = { createServer };
