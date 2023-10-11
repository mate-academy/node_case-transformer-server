const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');

const caseOptions = ['SNAKE', 'KEBAB', 'UPPER', 'CAMEL', 'PASCAL'];

function createServer() {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const [originalText, queryString] = req.url
      .split('?')
      .map(query => query
        .replace('/', ''));
    const params = new URLSearchParams(queryString);
    const targetCase = params.get('toCase');

    const errors = [];

    if (!originalText) {
      errors.push({
        message: 'Text to convert is required. '
          + 'Correct request is: '
          + '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!targetCase) {
      errors.push({
        message: '"toCase" query param is required. '
          + 'Correct request is: '
          + '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (targetCase && !caseOptions.includes(targetCase)) {
      errors.push({
        message: 'This case is not supported. '
          + 'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (errors.length) {
      res.statusCode = 400;
      res.end(JSON.stringify({ errors }));

      return;
    }

    const {
      originalCase,
      convertedText,
    } = convertToCase(originalText, targetCase);

    res.end(JSON.stringify({
      originalCase,
      targetCase,
      convertedText,
      originalText,
    }));
  });

  return server;
}

module.exports = {
  createServer,
};
