/* eslint-disable no-console */
const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase.js');

const createServer = () => {
  const correctCases = [
    'SNAKE',
    'KEBAB',
    'CAMEL',
    'PASCAL',
    'UPPER',
  ];

  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const [url, params] = req.url.split('?');
    const quertParams = new URLSearchParams(params);
    const caseName = quertParams.get('toCase');
    const textToConvert = url.slice(1);

    console.log(textToConvert.length < 1);
    console.log(!caseName);
    console.log(!correctCases.includes(caseName));

    if (textToConvert.length < 1
      || !caseName
      || !correctCases.includes(caseName)) {
      const messages = [];

      if (textToConvert.length < 1) {
        messages.push({
          // eslint-disable-next-line max-len
          message: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
        });
      };

      if (!caseName) {
        messages.push({
          // eslint-disable-next-line max-len
          message: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
        });
      } else if (!correctCases.includes(caseName)) {
        messages.push({
          // eslint-disable-next-line max-len
          message: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
        });
      };

      res.statusCode = 400;
      res.statusMessage = 'Bad request';

      res.end(JSON.stringify({
        errors: messages,
      }));

      return;
    }

    const {
      originalCase, convertedText,
    } = convertToCase(textToConvert, caseName);

    res.statusCode = 200;
    res.statusMessage = 'OK';

    res.end(JSON.stringify({
      originalCase,
      convertedText,
      targetCase: caseName,
      originalText: textToConvert,
    }));
  });

  return server;
};

module.exports = {
  createServer,
};
