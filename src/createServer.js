const http = require('http');
const { convertToCase } = require('./convertToCase');

const possibleCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

const verifyData = (text, toCase) => {
  const errors = [];

  if (!text) {
    errors.push({
      message:
        'Text to convert is required.'
        + ' Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  }

  if (!toCase) {
    errors.push({
      message:
        '"toCase" query param is required.'
        + ' Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  }

  if (toCase && !possibleCases.includes(toCase)) {
    errors.push({
      message:
        'This case is not supported.'
        + ' Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
    });
  }

  return errors;
};

const createServer = () => {
  const server = http.createServer((req, res) => {
    const normalizedUrl = new URL(req.url, `http://${req.headers.host}`);
    const text = normalizedUrl.pathname.slice(1);
    const toCase = normalizedUrl.searchParams.get('toCase');
    const errors = verifyData(text, toCase);

    res.setHeader('content-type', 'application/json');

    if (errors.length) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      res.end(JSON.stringify({ errors }));
      return;
    }

    const convertedText = convertToCase(text, toCase);
    res.statusCode = 200;
    res.statusMessage = 'OK';

    const responseToUser = {
      ...convertedText,
      targetCase: toCase,
      originalText: text,
    };

    res.end(JSON.stringify(responseToUser));
  });

  return server;
};

module.exports.createServer = createServer;
