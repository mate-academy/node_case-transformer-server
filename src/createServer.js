const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');

function createServer() {
  const server = http.createServer((req, res) => {
    const normalizedUrl = new URL(req.url, `http://${req.headers.host}`);

    res.setHeader('Content-Type', 'application/json');

    const { pathname, searchParams } = normalizedUrl;

    const originalText = pathname.slice(1);
    const caseParams = searchParams.toString().split('=');
    const targetCase = caseParams[1];
    const cases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
    const errors = [];

    const Errors = {
      textIsMissing: { message: 'Text to convert is required. Correct request'
      + ' is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".' },
      toCaseIsMissing: { message: '"toCase" query param is required. Correct'
      + ' request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".' },
      toCaseIsWrong: { message: 'This case is not supported. Available cases:'
      + ' SNAKE, KEBAB, CAMEL, PASCAL, UPPER.' },
    };

    if (!originalText) {
      errors.push(Errors.textIsMissing);
    };

    if (caseParams[0] !== 'toCase') {
      errors.push(Errors.toCaseIsMissing);
    } else if (!cases.includes(targetCase)) {
      errors.push(Errors.toCaseIsWrong);
    };

    if (errors.length) {
      res.statusCode = 404;
      res.statusText = 'Bad request';
      res.end(JSON.stringify({ errors }));

      return;
    };

    const { originalCase, convertedText } = convertToCase(
      originalText,
      targetCase,
    );

    res.statusCode = 200;

    res.end(
      JSON.stringify({
        originalCase,
        targetCase,
        originalText,
        convertedText,
      }),
    );
  });

  return server;
}

module.exports = { createServer };
