const http = require('http');
const { convertToCase } = require('./convertToCase');

const createServer = () => {
  const server = http.createServer((req, res) => {
    const partsOfURL = req.url.split('?');
    const textToConvert = partsOfURL[0].slice(1);
    const queryParams = partsOfURL[1];
    const params = new URLSearchParams(queryParams);
    const toCaseParam = params.get('toCase');

    const errors = [];
    const SUPP_CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

    if (!textToConvert) {
      errors.push({
        message:
          // eslint-disable-next-line max-len
          'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!toCaseParam) {
      errors.push({
        message:
          // eslint-disable-next-line max-len
          '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (toCaseParam && !SUPP_CASES.includes(toCaseParam)) {
      errors.push({
        message:
          // eslint-disable-next-line max-len
          'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (errors.length > 0) {
      res.writeHead(400, 'Bad request', { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ errors }));

      return;
    }

    const result = convertToCase(textToConvert, toCaseParam);
    const responseBody = {
      originalCase: result.originalCase,
      targetCase: toCaseParam,
      originalText: textToConvert,
      convertedText: result.convertedText,
    };

    res.writeHead(200, 'OK', { 'Content-type': 'application/json' });
    res.end(JSON.stringify(responseBody));
  });

  return server;
};

module.exports = {
  createServer,
};
