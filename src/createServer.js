const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');

function createServer() {
  return http.createServer((req, res) => {
    const normalizedURL = new URL(req.url, `http://${req.headers.host}`);
    const param = normalizedURL.searchParams.get('toCase');
    const textToConvert = normalizedURL.pathname.slice(1);
    const errors = [];
    const caseList = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

    if (!param) {
      errors.push({
        message: `"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
      });
    }

    if (!textToConvert) {
      errors.push({
        message: `Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
      });
    }

    if (param && !caseList.includes(param)) {
      errors.push({
        message: `This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.`,
      });
    }

    if (!errors.length) {
      const result = convertToCase(textToConvert, param);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.statusMessage = 'OK';

      res.end(
        JSON.stringify({
          originalCase: result.originalCase,
          targetCase: param,
          originalText: textToConvert,
          convertedText: result.convertedText,
        }),
      );
    } else {
      res.writeHead(400, { 'Content-type': 'application/json' });
      res.statusMessage = 'Bad request';
      res.end(JSON.stringify({ errors }));

      return;
    }

    res.end();
  });
}

module.exports = { createServer };
