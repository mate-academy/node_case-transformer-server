/* eslint-disable no-console */
/* eslint-disable max-len */
const http = require('http');

const { convertToCase } = require('./convertToCase/convertToCase');

const supportedCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function createServer() {
  const CRserver = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const [path, query] = req.url.split('?');
    const text = path ? path.replace(/^\//, '') : '';
    const params = new URLSearchParams(query || '');
    const toCase = params.get('toCase');

    const errors = [];

    if (!text) {
      errors.push({
        message:
          'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (toCase === null) {
      errors.push({
        message:
          '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (toCase !== null && !supportedCases.find((el) => el === toCase)) {
      errors.push({
        message:
          'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (errors.length > 0) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      res.setHeader('Content-Type', 'application/json');

      return res.end(JSON.stringify({ errors }));
    }

    const { originalCase, convertedText } = convertToCase(text, toCase);
    const body = {
      originalCase,
      targetCase: toCase,
      originalText: text,
      convertedText,
    };

    res.statusCode = 200;
    res.statusMessage = 'OK';
    res.setHeader('Content-Type', 'application/json');

    return res.end(JSON.stringify(body));
  });

  return CRserver;
}

module.exports = {
  createServer,
};
