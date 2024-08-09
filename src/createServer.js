const http = require('http');
const { convertToCase } = require('./convertToCase');

const CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function createServer() {
  return http.createServer((req, res) => {
    const url = new URL(req.url);

    res.setHeader('Content-Type', 'application/json');

    let response = {};

    const addError = (message) => {
      if (!response.errors) {
        response.errors = [];
      }

      response.errors.push({ message });
    };

    const text = url.pathname.slice(1);
    const targetCase = url.searchParams.get('toCase');

    if (!text) {
      addError(
        'Text to convert is required. Correct request is: ' +
          '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      );
    }

    if (!targetCase) {
      addError(
        '"toCase" query param is required. ' +
          'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      );
    }

    if (!CASES.includes(targetCase)) {
      addError(
        'This case is not supported. ' +
          'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      );
    }

    if (response.errors) {
      res.statusCode = '400';
      res.statusMessage = 'Bad request';
    } else {
      const { originalCase, convertedText } = convertToCase(text, targetCase);

      response = {
        originalCase,
        targetCase,
        text,
        convertedText,
      };
    }

    res.statusCode = '200';
    res.statusMessage = 'OK';

    res.end(JSON.stringify(response));
  });
}

module.exports = {
  createServer,
};
