const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');

function createServer() {
  return http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const normalizedUrl = new URL(req.url, 'http://localhost:5700');
    const wordToConvert = normalizedUrl.pathname.slice(1).trim();
    const convertMethod = normalizedUrl.searchParams.get('toCase');

    const errors = [];
    const cases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

    if (!wordToConvert) {
      errors.push({
        message:
          // eslint-disable-next-line max-len
          'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!convertMethod) {
      errors.push({
        message:
          // eslint-disable-next-line max-len
          '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    } else if (!cases.includes(convertMethod)) {
      errors.push({
        message:
          // eslint-disable-next-line max-len
          'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (errors.length > 0) {
      res.writeHead(400, {
        'Content-Type': 'application/json',
        Status: 'Bad Request',
      });

      return res.end(JSON.stringify({ errors }));
    }

    const convertWord = convertToCase(wordToConvert, convertMethod);

    res.writeHead(200, { 'Content-Type': 'application/json', Status: 'OK' });

    res.end(
      JSON.stringify({
        originalCase: convertWord.originalCase,
        targetCase: convertMethod,
        originalText: wordToConvert,
        convertedText: convertWord.convertedText,
      }),
    );
  });
}

module.exports = { createServer };
