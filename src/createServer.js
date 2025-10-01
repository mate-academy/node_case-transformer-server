const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');

const CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

const notText = `Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`;

const noCase = `"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`;

const wrongCase = `This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.`;

function createServer() {
  const server = http.createServer((req, res) => {
    const [path, queryString] = req.url.split('?');

    const textToTransform = (path || '').slice(1);
    const toCase = new URLSearchParams(queryString).get('toCase');
    const errors = [];

    if (!textToTransform) {
      errors.push(notText);
    }

    if (!toCase) {
      errors.push(noCase);
    } else if (!CASES.includes(toCase)) {
      errors.push(wrongCase);
    }

    res.setHeader('Content-Type', 'application/json');

    if (errors.length > 0) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';

      res.end(
        JSON.stringify({ errors: errors.map((message) => ({ message })) }),
      );

      return;
    }

    const result = convertToCase(toCase, textToTransform);

    const body = {
      originalCase: result.originalCase,
      targetCase: toCase,
      originalText: textToTransform,
      convertedText: result.convertedText,
    };

    res.statusCode = 200;
    res.statusMessage = 'OK';
    res.end(JSON.stringify(body));
  });

  return server;
}

module.exports = { createServer };
