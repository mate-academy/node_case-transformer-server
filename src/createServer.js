const http = require('http');
const { convertToCase } = require('./convertToCase');

const caseOptions = ['SNAKE', 'KEBAB', 'UPPER', 'CAMEL', 'PASCAL'];

function createServer() {
  return http.createServer((req, res) => {
    const [path, queryString] = req.url.split('?');

    const params = new URLSearchParams(queryString);
    const toCase = params.get('toCase');
    const textToConvert = path.slice(1);

    const errors = [];

    if (!textToConvert) {
      errors.push({
        message: 'Text to convert is required. '
          + 'Correct request is: '
          + '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!toCase) {
      errors.push({
        message: '"toCase" query param is required. '
          + 'Correct request is: '
          + '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (toCase && !caseOptions.includes(toCase)) {
      errors.push({
        message: 'This case is not supported. '
          + 'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    res.setHeader('Content-Type', 'application/json');

    if (errors.length > 0) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      res.end(JSON.stringify({ errors }));

      return;
    }

    const result = {
      ...convertToCase(textToConvert, toCase),
      targetCase: toCase,
      originalText: textToConvert,
    };

    res.statusCode = 200;
    res.statusMessage = 'Ok';
    res.end(JSON.stringify(result));
  });
}

module.exports = { createServer };
