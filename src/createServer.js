const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase.js');

function createServer() {
  const server = http.createServer((request, response) => {
    const cases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
    const textToConvert = request.url.split('?')[0].slice(1);
    const params = new URLSearchParams(request.url.split('?')[1]);
    const toCase = params.get('toCase');
    const errors = [];

    if (!textToConvert) {
      errors.push({
        message: 'Text to convert is required. Correct request is:'
          // eslint-disable-next-line no-useless-escape
          + ' \"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>\".',
      });
    }

    if (!toCase) {
      errors.push({
        message: '\"toCase\" query param is required. Correct request is:'
        // eslint-disable-next-line no-useless-escape
        + ' \"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>\".',
      });
    }

    if (!cases.includes(toCase) && toCase) {
      errors.push({
        message: 'This case is not supported. Available cases: '
        + 'SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (errors.length > 0) {
      response.writeHead(400, { 'Content-Type': 'application/json' });
      response.write(JSON.stringify({ errors }));
      response.end();

      return;
    }

    const newText = convertToCase(textToConvert, toCase);
    const result = {
      originalCase: newText.originalCase,
      targetCase: toCase,
      originalText: textToConvert,
      convertedText: newText.convertedText,

    };

    response.writeHeader(400, { 'Content-Type': 'application/json' });
    response.write(JSON.stringify(result));
    response.end();
  });

  return server;
}

module.exports = { createServer };
