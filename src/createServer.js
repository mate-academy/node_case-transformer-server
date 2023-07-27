const http = require('http');
const { convertToCase } = require('./convertToCase');

const createServer = () => {
  const SUPPORTED_PARAMS = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const [url, params] = req.url.split('?');
    const quertParams = new URLSearchParams(params);
    const targetCase = quertParams.get('toCase');
    const originalText = url.slice(1);

    if (
      originalText.length === 0
      || !SUPPORTED_PARAMS.includes(targetCase)
      || !targetCase
    ) {
      const messages = [];

      if (originalText.length === 0) {
        messages.push({
          // eslint-disable-next-line max-len
          message: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
        });
      }

      if (!targetCase) {
        messages.push({
          // eslint-disable-next-line max-len
          message: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
        });
      } else if (!SUPPORTED_PARAMS.includes(targetCase)) {
        messages.push({
          // eslint-disable-next-line max-len
          message: `This case is not supported. Available cases: ${SUPPORTED_PARAMS.join(', ')}.`,
        });
      }

      res.statusCode = 400;
      res.statusMessage = 'Bad request';

      res.end(JSON.stringify({
        errors: messages,
      }));

      return;
    }

    const {
      originalCase, convertedText,
    } = convertToCase(originalText, targetCase);

    res.statusCode = 200;
    res.statusMessage = 'OK';

    res.end(JSON.stringify({
      originalCase,
      targetCase,
      originalText,
      convertedText,
    }));
  });

  return server;
};

module.exports = {
  createServer,
};
