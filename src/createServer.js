const http = require('node:http');
const { convertToCase } = require('./convertToCase/convertToCase.js');

const allowedFormats = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

const createServer = () => {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const [pathname, queryString] = req.url.split('?');
    const text = pathname.slice(1);

    const targetCase = new URLSearchParams(queryString).get('toCase');

    const errors = [];

    if (!text) {
      errors.push({
        message: `Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
      });
    }

    if (!targetCase) {
      errors.push({
        message: `"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
      });
    } else if (!allowedFormats.includes(targetCase)) {
      errors.push({
        message: `This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.`,
      });
    }

    if (errors.length > 0) {
      res.statusCode = 400;
      res.end(JSON.stringify({ errors }));

      return;
    }

    const { originalCase, convertedText } = convertToCase(text, targetCase);

    res.statusCode = 200;

    res.end(
      JSON.stringify({
        originalCase,
        targetCase,
        originalText: text,
        convertedText,
      }),
    );
  });

  return server;
};

module.exports = {
  createServer,
};
