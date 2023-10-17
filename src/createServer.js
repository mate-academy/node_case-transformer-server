/* eslint-disable max-len */

const http = require('http');
const { convertToCase } = require('./convertToCase');

function createServer() {
  const server = http.createServer((req, res) => {
    const { url } = req;
    const query = new URLSearchParams(url.split('?')[1]);

    const errors = [];

    const text = url.split('/')[1];
    const targetCase = query.get('toCase');

    res.setHeader('Content-Type', 'application/json');

    if (!text.split('?')[0]) {
      errors.push(
        // eslint-disable-next-line no-useless-escape
        { message: 'Text to convert is required. Correct request is: \"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>\".' },
      );
    }

    if (!text.split('?')[1] || !targetCase) {
      errors.push(
        // eslint-disable-next-line no-useless-escape
        { message: '\"toCase\" query param is required. Correct request is: \"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>\".' },
      );
    }

    if (text.split('?')[1] && !['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'].includes(targetCase)) {
      errors.push(
        { message: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.' },
      );
    }

    if (errors.length > 0) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ errors }));

      return;
    }

    const result = convertToCase(text, targetCase);
    const words = text.split('?')[0];

    res.writeHead(200, { 'Content-Type': 'application/json' });

    res.write(JSON.stringify(
      {
        ...result,
        targetCase,
        originalText: words,
      },
    ));

    res.end();
  });

  return server;
}

module.exports = { createServer };
