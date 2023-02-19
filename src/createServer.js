const http = require('http');

const { detectCase } = require('./convertToCase/detectCase.js');
const { convertToCase } = require('./convertToCase/convertToCase.js');

const caseVariants = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function createServer() {
  const server = http.createServer((req, res) => {
    const normalizedUrl = new URL(req.url, `http://${req.headers.host}`);
    const toCase = normalizedUrl.searchParams.get('toCase');
    const textToConvert = normalizedUrl.pathname.slice(1);
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

    if (caseVariants.indexOf(toCase) === -1 && toCase) {
      errors.push({
        message:
          'This case is not supported. '
          + 'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (errors.length) {
      res.statusMessage = 'Bad request';
      res.statusCode = '400';

      res.end(JSON.stringify({ errors }));
    }

    if (!errors.length) {
      const newConvertedText = convertToCase(textToConvert, toCase);

      res.statusCode = '200';
      res.statusMessage = 'OK';

      const response = {
        ...newConvertedText,
        originalCase: detectCase(textToConvert),
        targetCase: toCase,
        originalText: textToConvert,
      };

      res.end(JSON.stringify(response));
    }
  });

  return server;
}

module.exports = {
  createServer,
};
