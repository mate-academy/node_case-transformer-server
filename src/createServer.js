const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');

const convertParameters = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function createServer() {
  const server = http.createServer((req, res) => {
    const paramsSplit = req.url.split('?');
    const messageToConvert = paramsSplit[0].slice(1);
    const params = new URLSearchParams(paramsSplit[1]);
    const paramsToConvert = params.get('toCase');

    res.setHeader('Content-Type', 'application/json');

    const errors = [];

    if (!convertParameters.includes(paramsToConvert)
    && paramsToConvert !== null) {
      errors.push(
        {
          // eslint-disable-next-line max-len
          message: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
        },
      );
    }

    if (messageToConvert.length === 0) {
      errors.push({
        // eslint-disable-next-line max-len
        message: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (paramsToConvert === null) {
      errors.push({
        // eslint-disable-next-line max-len
        message: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (errors.length) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      res.end(JSON.stringify({ errors }));

      return;
    }

    const convertedMessage = convertToCase(messageToConvert, paramsToConvert);
    const serverRespone = {
      originalCase: convertedMessage.originalCase,
      targetCase: paramsToConvert,
      originalText: messageToConvert,
      convertedText: convertedMessage.convertedText,
    };

    res.statusCode = 200;
    res.end(JSON.stringify(serverRespone));
  });

  return server;
}

module.exports = { createServer };
