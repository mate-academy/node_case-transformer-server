const http = require('http');
const { convertToCase } = require('./convertToCase');

/* eslint-disable no-console */
/* eslint-disable max-len */
function createServer() {
  const server = http.createServer((req, res) => {
    const url = new URL(req.url || '', `http://${req.headers.host}`);

    const userText = url.pathname.slice(1);
    const typeOfCase = url.searchParams.get('toCase');
    const errors = [];
    const typesOfCase = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

    if (!userText) {
      errors.push({
        message:
          'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!typeOfCase) {
      errors.push({
        message:
          '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (typeOfCase && !typesOfCase.includes(typeOfCase)) {
      errors.push({
        message:
          'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    res.setHeader('content-type', 'application/json');

    if (errors.length > 0) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      res.end(JSON.stringify({ errors }));
    } else {
      const result = convertToCase(userText, typeOfCase);

      res.statusCode = 200;
      res.statusMessage = 'OK';

      res.end(
        JSON.stringify({
          originalCase: result.originalCase,
          targetCase: typeOfCase,
          originalText: userText,
          convertedText: result.convertedText,
        }),
      );
    }
  });

  return server;
}

module.exports = {
  createServer,
};
