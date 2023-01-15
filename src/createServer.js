const http = require('http');

const { convertToCase } = require('./convertToCase/convertToCase');

const cases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function createServer() {
  const server = http.createServer((req, res) => {
    const errors = [];

    const splitUrl = req.url.split('?');
    const parseUrl = new URLSearchParams(splitUrl[1]);
    const toCase = parseUrl.get('toCase');
    const text = splitUrl[0].slice(1);

    res.setHeader('Content-Type', 'application/json');

    if (!text) {
      // eslint-disable-next-line max-len
      errors.push({ message: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".' });
    }

    if (!toCase) {
      errors.push({
        // eslint-disable-next-line max-len
        message: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    } else if (!cases.includes(toCase)) {
      errors.push({
        // eslint-disable-next-line max-len
        message: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    const data = convertToCase(text, toCase);

    if (!errors.length) {
      res.statusCode = 200;
      res.statusMessage = 'OK';

      res.end(JSON.stringify({
        originalCase: data.originalCase,
        targetCase: toCase,
        originalText: text,
        convertedText: data.convertedText,
      }));
    } else {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';

      res.end(JSON.stringify({ errors }));
    }
  });

  return server;
}

module.exports = {
  createServer,
};
