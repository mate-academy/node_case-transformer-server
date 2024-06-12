const http = require('http');
const { convertToCase } = require('./convertToCase');

function createServer() {
  const server = http.createServer((req, res) => {
    const urlArray = req.url.split('?');
    const textToConvert = urlArray[0].slice(1);
    const queryParams = new URLSearchParams(urlArray[1]);
    const toCase = queryParams.get('toCase');

    const errors = [];

    if (!textToConvert) {
      errors.push({
        message: `Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
      });
    }

    if (!toCase) {
      errors.push({
        message: `"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
      });
    } else if (
      !['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'].includes(toCase)
    ) {
      errors.push({
        message: `This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.`,
      });
    }

    if (errors.length > 0) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ errors }));

      return;
    }

    const result = convertToCase(textToConvert, toCase);
    const response = {
      originalCase: result.originalCase,
      targetCase: toCase,
      originalText: textToConvert,
      convertedText: result.convertedText,
    };

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(response));
  });

  return server;
}
module.exports = { createServer };
