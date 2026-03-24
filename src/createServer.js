/* eslint-disable max-len */
const http = require('node:http');
const { convertToCase } = require('./convertToCase');

const CASE_NAME = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function createServer() {
  const server = http.createServer((req, res) => {
    const [pathname, search] = req.url.split('?');

    const toCase = new URLSearchParams(search || '').get('toCase') || '';
    const text = pathname.slice(1);
    const validate = {
      errors: [],
    };

    if (text.trim() === '') {
      validate.errors.push({
        message:
          'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (toCase === '') {
      validate.errors.push({
        message:
          '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    } else if (!CASE_NAME.includes(toCase)) {
      validate.errors.push({
        message:
          'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (validate.errors.length !== 0) {
      res.statusCode = 400;
      res.setHeader('Content-type', 'application/json');
      res.statusMessage = 'Bad request';
      res.end(JSON.stringify(validate));

      return;
    }

    const { originalCase, convertedText } = convertToCase(text, toCase);

    const result = {
      originalCase: originalCase,
      targetCase: toCase,
      originalText: text,
      convertedText: convertedText,
    };

    res.statusCode = 200;
    res.setHeader('Content-type', 'application/json');
    res.statusMessage = 'OK';
    res.end(JSON.stringify(result));
  });

  return server;
}

module.exports = {
  createServer,
};
