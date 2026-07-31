const http = require('http');
const { convertToCase } = require('./convertToCase');

function createServer() {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const url = req.url.split('?');

    const text = url[0].slice(1);
    const queryString = url[1];

    const toCase = new URLSearchParams(queryString).get('toCase');

    const errors = [];

    if (text.length === 0) {
      errors.push({
        message: `Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
      });
    }

    if (toCase === null || toCase.length === 0) {
      errors.push({
        message: `"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
      });
    }

    const strings = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

    if (toCase !== null && !strings.includes(toCase)) {
      errors.push({
        message: `This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.`,
      });
    }

    if (errors.length > 0) {
      res.writeHead(400, 'Bad request');
      res.end(JSON.stringify({ errors }));
    } else {
      const result = convertToCase(text, toCase);

      res.writeHead(200, 'OK');

      const responseObject = {
        originalCase: result.originalCase,
        targetCase: toCase,
        originalText: text,
        convertedText: result.convertedText,
      };

      res.end(JSON.stringify(responseObject));
    }
  });

  return server;
}

module.exports = { createServer };
