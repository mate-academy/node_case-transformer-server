const http = require('http');
const { convertToCase } = require('./convertToCase');

function createServer() {
  return http.createServer((req, res) => {
    const { url } = req;
    const [pathName, query] = url.split('?');
    const text = pathName.slice(1);

    const params = new URLSearchParams(query);

    const toCase = params.get('toCase');

    const errors = [];

    if (text === '') {
      res.statusCode = 400;

      res.setHeader('Content-Type', 'application/json');

      errors.push({
        // eslint-disable-next-line max-len
        message: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (toCase === null) {
      res.statusCode = 400;

      res.setHeader('Content-Type', 'application/json');

      errors.push({
        // eslint-disable-next-line max-len
        message: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    } else if (
      !['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER']
        .includes(toCase)
    ) {
      res.statusCode = 400;

      res.setHeader('Content-Type', 'application/json');

      errors.push({
        // eslint-disable-next-line max-len
        message: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (errors.length > 0) {
      res.end(JSON.stringify({
        errors,
      }));

      return;
    }

    const {
      convertedText,
      originalCase,
    } = convertToCase(text, toCase);

    res.setHeader('Content-Type', 'application/json');

    res.end(JSON.stringify({
      convertedText,
      originalCase,
      originalText: text,
      targetCase: toCase,
    }));
  });
}

module.exports = {
  createServer,
};
