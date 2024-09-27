const http = require('http');

const { convertToCase } = require('./convertToCase');

function createServer() {
  const server = http.createServer((req, res) => {
    const splitedURL = req.url.split('?');
    const params = new URLSearchParams(splitedURL[1]);
    const fromCase = splitedURL[0].replace('/', '');
    const toCase = params.get('toCase');

    const supportedCase = [
      'SNAKE',
      'KEBAB',
      'CAMEL',
      'PASCAL',
      'UPPER',
    ];

    const errors = [];

    res.setHeader('Content-Type', 'application/json');

    const errorMessage = {
      textIsRequared: 'Text to convert is required.'
        + ' Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      paramIsRequared: '"toCase" query param is required.'
        + ' Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      supportedCase: 'This case is not supported.'
        + ' Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
    };

    if (!fromCase) {
      errors.push({ message: errorMessage.textIsRequared });
    }

    if (!toCase) {
      errors.push({ message: errorMessage.paramIsRequared });
    } else if (!supportedCase.includes(toCase)) {
      errors.push({ message: errorMessage.supportedCase });
    }

    if (errors.length) {
      res.statusCode = 400;
      res.statusText = 'Bad request';

      res.end(JSON.stringify({ errors }));

      return;
    }

    const convertedText = convertToCase(fromCase, toCase);

    res.end(JSON.stringify({
      originalCase: convertedText.originalCase,
      targetCase: toCase,
      originalText: fromCase,
      convertedText: convertedText.convertedText,
    }));
  });

  return server;
}

module.exports = { createServer };
