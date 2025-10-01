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
    const error = [];

    if (!textToTransform) {
      error.push(notText);
    }

    if (!toCase) {
      error.push(noCase);
    } else if (!CASES.includes(toCase)) {
      error.push(wrongCase);
    }

    res.setHeader('Content-Type', 'application/json');

    if (error.length > 0) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';

      res.end(
        JSON.stringify({ errors: error.map((message) => ({ message })) }),
      );

      return;
    }

    const convertedText = convertToCase(textToTransform, toCase);

    const body = {
      originalCase: convertedText.originalCase,
      targetCase: toCase,
      originalText: textToTransform,
      convertedText: convertedText.convertedText,
    };

    res.statusCode = 200;
    res.statusMessage = 'OK';
    res.end(JSON.stringify(body));
  });

  return server;
}

module.exports = { createServer };
