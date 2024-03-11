/* eslint-disable no-console */
const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');

const AVALIABE_CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
const ERR_CONVERT_TEXT = 'Text to convert is required. Correct request is:'
+ ' "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';
const ERR_TO_CASE = '"toCase" query param is required.'
+ ' Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';
const ERR_SUPORTED_CASE = 'This case is not supported.'
+ ' Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.';

const createServer = () => {
  const sever = http.createServer((req, res) => {
    const { pathname, searchParams } = new URL(req.url, `http://${req.headers.host}`);
    const textToConvert = pathname.slice(1);
    const toCase = searchParams.get('toCase');

    const errors = [];

    if (!textToConvert) {
      errors.push({ message: ERR_CONVERT_TEXT });
    }

    if (!toCase) {
      errors.push({ message: ERR_TO_CASE });
    } else if (!AVALIABE_CASES.includes(toCase)) {
      errors.push({ message: ERR_SUPORTED_CASE });
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
