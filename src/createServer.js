const http = require('node:http');

const { convertToCase } = require('./convertToCase');

const supportedCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

const messages = {
  text:
    'Text to convert is required. Correct request is: ' +
    '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  toCase:
    '"toCase" query param is required. Correct request is: ' +
    '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  unsupported:
    'This case is not supported. Available cases: ' +
    'SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
};

function createServer() {
  return http.createServer((request, response) => {
    const [pathname, queryString = ''] = request.url.split('?');
    const text = decodeURIComponent(pathname.slice(1));
    const params = new URLSearchParams(queryString);
    const toCase = params.get('toCase');
    const errors = [];

    if (!text) {
      errors.push({ message: messages.text });
    }

    if (!toCase) {
      errors.push({ message: messages.toCase });
    } else if (!supportedCases.includes(toCase)) {
      errors.push({ message: messages.unsupported });
    }

    response.setHeader('Content-Type', 'application/json');

    if (errors.length) {
      response.statusCode = 400;
      response.statusMessage = 'Bad request';
      response.end(JSON.stringify({ errors }));

      return;
    }

    const { originalCase, convertedText } = convertToCase(text, toCase);

    response.statusCode = 200;
    response.statusMessage = 'OK';

    response.end(
      JSON.stringify({
        originalCase,
        targetCase: toCase,
        originalText: text,
        convertedText,
      }),
    );
  });
}

module.exports = {
  createServer,
};
