const http = require('http');
const { convertToCase } = require('./convertToCase');

function createServer() {
  const server = http.createServer((req, res) => {
    const [text, queryString] = req.url.split('?');
    const textToConvert = text.slice(1);
    const searchParams = new URLSearchParams(queryString);
    const toCase = searchParams.get('toCase');

    const supportedCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

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
    }

    if (toCase && !supportedCases.includes(toCase)) {
      errors.push({
        message: `This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.`,
      });
    }

    if (errors.length > 0) {
      res
        .writeHead(400, { 'Content-Type': 'application/json' })
        .end(JSON.stringify({ errors }));
    } else {
      const { convertedText, originalCase } = convertToCase(
        textToConvert,
        toCase,
      );
      const respond = {
        originalCase,
        targetCase: toCase,
        originalText: textToConvert,
        convertedText,
      };

      res
        .writeHead(200, { 'Content-Type': 'application/json' })
        .end(JSON.stringify(respond));
    }
  });

  return server;
}

module.exports = {
  createServer,
};
