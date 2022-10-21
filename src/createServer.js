const http = require('http');
const { convertToCase } = require('./convertToCase');

function createServer() {
  return http.createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const originalText = url.pathname.slice(1);
    const query = Object.fromEntries(url.searchParams.entries());
    const targetCase = query.toCase;
    const cases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
    const errorMessages = {
      noTextToConvert: 'Text to convert is required.'
      + ' Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      noParam: '"toCase" query param is required.'
      + ' Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      invalidCase: 'This case is not supported.'
      + ` Available cases: ${cases.join(', ')}.`,
    };

    res.setHeader('Content-type', 'application/json');

    const errors = [];

    if (!originalText) {
      errors.push({ message: errorMessages.noTextToConvert });
    };

    if (!targetCase) {
      errors.push({ message: errorMessages.noParam });
    } else if (!(cases.includes(targetCase))) {
      errors.push({ message: errorMessages.invalidCase });
    };

    if (errors.length) {
      res.statusCode = 400;
      res.statusText = 'Bad request';
      res.end(JSON.stringify({ errors }));

      return;
    }

    const {
      originalCase, convertedText,
    } = convertToCase(originalText, targetCase);

    res.statusCode = 200;

    res.end(JSON.stringify({
      originalCase,
      convertedText,
      originalText,
      targetCase,
    }));
  });
};

module.exports = { createServer };
