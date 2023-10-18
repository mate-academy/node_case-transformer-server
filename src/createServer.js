const http = require('http');
const url = require('url');
const { convertToCase } = require('./convertToCase/convertToCase.js');

const createServer = () => {
  const server = http.createServer((request, response) => {
    const { pathname, searchParams } = new url.URL(
      request.url,
      `http://${request.headers.host}`,
    );
    const textToConvert = pathname.slice(1);
    const toCase = searchParams.get('toCase');
    const errors = [];

    if (!textToConvert) {
      errors.push({
        message: 'Text to convert is required. Correct request is: '
        + '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!toCase) {
      errors.push({
        message: '"toCase" query param is required. Correct request is: '
        + '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (toCase
      && !['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'].includes(toCase)) {
      errors.push({
        message: 'This case is not supported. Available cases: '
        + 'SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (errors.length) {
      response.statusCode = 400;
      response.setHeader('Content-Type', 'application/json');
      response.end(JSON.stringify({ errors }));
    } else {
      const result = convertToCase(textToConvert, toCase);

      response.statusCode = 200;
      response.setHeader('Content-Type', 'application/json');

      response.end(JSON.stringify({
        originalCase: result.originalCase,
        targetCase: toCase,
        originalText: textToConvert,
        convertedText: result.convertedText,
      }));
    }
  });

  return server;
};

module.exports = {
  createServer,
};
