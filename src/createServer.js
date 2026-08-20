const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');

function createServer() {
  return http.createServer((req, res) => {
    const textUrl = req.url;
    const textAndMethod = textUrl.split('?');
    const text = textAndMethod[0].slice(1);
    const method = textAndMethod[1];
    const params = new URLSearchParams(method);
    const toCase = params.get('toCase');

    const typesTocase = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

    const errors = [];

    if (!toCase) {
      errors.push({
        message:
        '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (text === '') {
      errors.push({
        message:
        'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (toCase && !typesTocase.includes(toCase)) {
      errors.push({
        message: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.'
      });
    }

    if (errors.length > 0) {
      res.writeHead(400, { 'content-type': 'application/json' });
      res.end(JSON.stringify({ errors }));
      return;
    }

    const result = convertToCase(text, toCase);
    const resultFinal = {
      originalCase: result.originalCase,
      targetCase: toCase,
      originalText: text,
      convertedText: result.convertedText,
    };

    res.writeHead(200, { 'content-type': 'application/json' });
    res.end(JSON.stringify(resultFinal));
  });
}

module.exports = { createServer };
