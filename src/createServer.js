
const http = require('http');
const { convertToCase } = require('./convertToCase');

function createServer() {
  const server = http.createServer((request, response) => {
    response.setHeader('Content-Type', 'application/json');

    const normalizedURL = new URL(request.url, `http://${request.headers.host}`);
    const availableCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

    const { pathname, searchParams } = normalizedURL;

    const errors = [];

    const text = pathname.slice(1);

    const params = Object.fromEntries(searchParams.entries());

    if (text === '') {
      errors.push({
        message: 'Text to convert is required. '
        + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!params.toCase) {
      errors.push({
        message: '"toCase" query param is required. '
        + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    } else if (!availableCases.includes(params.toCase)) {
      errors.push({
        message: 'This case is not supported. '
        + 'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (errors.length) {
      response.statusCode = 404;
      response.statusText = 'Bad request';
      response.end(JSON.stringify({ errors }));

      return;
    }

    const { originalCase, convertedText } = convertToCase(text, params.toCase);

    response.statusCode = 200;

    response.end(JSON.stringify({
      convertedText,
      originalCase,
      originalText: text,
      targetCase: params.toCase,
    }));
  });

  return server;
}

module.exports = { createServer };
