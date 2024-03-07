/* eslint-disable no-console */
const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');

const createServer = () => {
  const sever = http.createServer((req, res) => {
    const { pathname, searchParams } = new URL(req.url, `http://${req.headers.host}`);
    const textToConvert = pathname.slice(1);
    const toCase = searchParams.get('toCase');

    const errors = [];

    if (!textToConvert) {
      errors.push({ message: 'Text to convert is required. Correct request is:'
      + ' "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".' });
    }

    if (!toCase) {
      errors.push({ message: '"toCase" query param is required.'
      + ' Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".' });
    } else if (!['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER']
      .includes(toCase)) {
      errors.push({ message: 'This case is not supported.'
      + ' Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.' });
    }

    if (errors.length > 0) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ errors }));

      return;
    }

    const convertedText = convertToCase(textToConvert, toCase);

    res.writeHead(200, { 'Content-Type': 'application/json' });

    res.end(JSON.stringify({
      originalCase: convertedText.originalCase,
      targetCase: toCase,
      originalText: textToConvert,
      convertedText: convertedText.convertedText,
    }));
  });

  return sever;
};

module.exports = { createServer };
