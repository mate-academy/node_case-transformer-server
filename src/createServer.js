const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');
const CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function validateParams(text, toCase) {
  const errors = [];

  if (!text) {
    errors.push({
      message:
        'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  }

  if (!toCase) {
    errors.push({
      message:
        '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".'
    });
  }

  if (toCase && !CASES.includes(toCase.toUpperCase())) {
    errors.push({
      message:
        'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.'
    });
  }

  return errors;
}

function createServer() {
  return http.createServer(function (req, res) {
    const [path, queryString] = req.url.split('?');

    const params = new URLSearchParams(queryString);
    const toCase = params.get('toCase');
    const errors = validateParams(path.slice(1), toCase);

    if (errors.length) {
      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 400;
      res.end(JSON.stringify({ errors }));

      return;
    }

    const target = { originalText: path.slice(1), targetCase: toCase };
    const result = convertToCase(path.slice(1), toCase);

    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;

    res.end(JSON.stringify({ ...result, ...target }));
  });
}

module.exports = { createServer };
