const http = require('http');
const { convertToCase } = require('./convertToCase/');

function createServer() {
  return http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const cases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

    const errors = [];

    const originalText = req.url.split('?')[0].split('/')[1];

    const params = new URLSearchParams(req.url.split('?')[1]);
    const targetCase = params.get('toCase');

    if (!originalText) {
      errors.push({ message: 'Text to convert is required. '
      + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".' });
    }

    if (!targetCase) {
      errors.push({ message: '"toCase" query param is required. '
      + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".' });
    } else if (!(cases.includes(targetCase))) {
      errors.push({ message: 'This case is not supported. '
        + 'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.' });
    };

    if (errors.length) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';

      res.end(JSON.stringify({
        errors,
      }, null, 3));
    } else {
      const {
        originalCase, convertedText,
      } = convertToCase(originalText, targetCase);

      res.statusCode = 200;
      res.statusMessage = 'OK';

      res.end(JSON.stringify({
        originalCase,
        targetCase,
        originalText,
        convertedText,
      }, null, 3));
    }
  });
}

module.exports = { createServer };
