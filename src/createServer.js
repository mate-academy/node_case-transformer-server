const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');

const CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

const notText = `Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`;

const noCase = `"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`;

const wrongCase = `This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.`;

function createServer() {
  const server = http.createServer((req, res) => {
    const normalizedUrl = new URL(req.url, 'http://localhost:5700');
    const textToTransform = normalizedUrl.pathname.slice(1);
    const toCase = normalizedUrl.searchParams.get('toCase');

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
      res.statusMessage = 'Bad Request';

      res.end(
        JSON.stringify({ errors: errors.map((message) => ({ message })) }),
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
