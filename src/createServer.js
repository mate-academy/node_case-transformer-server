const http = require('http');
const url = require('url');

const { detectCase } = require('./convertToCase/detectCase.js');
const { convertToCase } = require('./convertToCase/convertToCase.js');

const caseName = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function createServer() {
  const server = http.createServer((req, res) => {
    const normalizedUrl = new url.URL(req.url, `http://${req.headers.host}`);
    const textToConvert = normalizedUrl.pathname.slice(1);
    const params = normalizedUrl.searchParams;
    const toCase = params.get('toCase');
    const errors = [];

    res.setHeader('Content-Type', 'application/json');

    if (!textToConvert) {
      errors.push({
        message:
          'Text to convert is required. Correct request is: '
          + '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!toCase) {
      errors.push({
        message:
          '"toCase" query param is required. Correct request is: '
          + '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (caseName.indexOf(toCase) === -1 && toCase) {
      errors.push({
        message:
          'This case is not supported. '
          + 'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (errors.length !== 0) {
      res.statusMessage = 'Bad request';
      res.statusCode = '400';

      res.end(JSON.stringify({ errors }));

      return;
    }

    res.statusCode = '200';
    res.statusMessage = 'OK';

    const response = {
      convertedText: convertToCase(textToConvert, toCase).convertedText,
      originalCase: detectCase(textToConvert),
      targetCase: toCase,
      originalText: textToConvert,
    };

    res.end(JSON.stringify(response));
  });

  return server;
}

module.exports = {
  createServer,
};
