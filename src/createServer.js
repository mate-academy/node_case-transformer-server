const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');

function createServer() {
  return http.createServer((request, response) => {
    response.setHeader('Content-Type', 'application/json');

    const url = new URL(request.url, `http://${request.headers.host}`);
    const text = url.pathname.slice(1);
    const toCase = url.searchParams.get('toCase');

    const validCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
    const errors = [];

    if (!text) {
      errors.push({
        message:
          'Text to convert is required. Correct request is: ' +
          '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!toCase) {
      errors.push({
        message:
          '"toCase" query param is required. Correct request is: ' +
          '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    } else if (!validCases.includes(toCase)) {
      errors.push({
        message: `This case is not supported. Available cases: ${validCases.join(', ')}.`,
      });
    }

    if (errors.length > 0) {
      response.statusCode = 404;
      response.write(JSON.stringify({ errors }));
      response.end();

      return;
    }

    const result = convertToCase(text, toCase);

    response.statusCode = 200;

    response.write(
      JSON.stringify({
        originalCase: result.originalCase,
        targetCase: toCase,
        originalText: text,
        convertedText: result.convertedText,
      }),
    );
    response.end();
  });
}

module.exports = { createServer };
