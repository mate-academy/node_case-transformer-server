const http = require('http');
const { convertToCase } = require('./convertToCase');

function createServer() {
  return http.createServer((req, res) => {
    const urlParams = req.url.split('?');
    const text = urlParams[0].slice(1);
    const queryString = urlParams[1] || '';

    const params = new URLSearchParams(queryString);
    const toCase = params.get('toCase');

    const valueToCase = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

    const errors = [];

    if (text.length === 0) {
      errors.push({
        message:
          'Text to convert is required. Correct request is: ' +
          '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!toCase) {
      errors.push({
        message:
          '"toCase" query param is required. Correct request is: ' +
          '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (toCase && !valueToCase.includes(toCase)) {
      errors.push({
        message:
          'This case is not supported. Available cases: SNAKE, KEBAB, ' +
          'CAMEL, PASCAL, UPPER.',
      });
    }

    if (errors.length > 0) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ errors }));

      return;
    }

    const result = convertToCase(text, toCase);

    res.statusCode = 200;
    res.statusMessage = 'OK';
    res.setHeader('Content-Type', 'application/json');

    res.end(
      JSON.stringify({
        originalCase: result.originalCase,
        targetCase: toCase,
        originalText: text,
        convertedText: result.convertedText,
      }),
    );
  });
}

module.exports = { createServer };
