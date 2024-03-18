/* eslint-disable max-len */
const http = require('http');
const { convertToCase } = require('./convertToCase');

function handleErrors(toCase, text) {
  const errors = [];
  const cases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

  const toCaseMessage = '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';
  const textMessage = 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';
  const casesMessage = 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.';

  if (!toCase) {
    errors.push({
      message: toCaseMessage,
    });
  }

  if (!text) {
    errors.push({
      message: textMessage,
    });
  }

  if (!cases.includes(toCase)) {
    errors.push({
      message: casesMessage,
    });
  }

  return errors;
}

function createServer() {
  const server = http.createServer((req, res) => {
    res.setHeader('content-type', 'application/json');

    const [url, queryString] = req.url.split('?');
    const params = new URLSearchParams(queryString || '');

    const text = url.replace(/^\//, '');
    const toCase = params.get('toCase');

    const CODE_STATUS_200 = 'OK';
    const CODE_STATUS_400 = 'Bad Request';
    const CODE_STATUS_500 = 'Internal Server Error';

    const errors = handleErrors(toCase, text);

    if (errors.length > 0) {
      res.writeHead(400, CODE_STATUS_400);
      res.end(JSON.stringify({ errors }));

      return;
    }

    const { originalCase, convertedText } = convertToCase(text, toCase);

    if (!originalCase || !convertedText) {
      res.writeHead(500, CODE_STATUS_500);
      res.end(JSON.stringify({ error: CODE_STATUS_500 }));

      return;
    }

    res.writeHead(200, CODE_STATUS_200);

    const responseBody = {
      originalCase,
      targetCase: toCase,
      originalText: text,
      convertedText,
    };

    res.end(JSON.stringify(responseBody));
  });

  return server;
}

module.exports = {
  createServer,
};
