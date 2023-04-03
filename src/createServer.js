const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');

const correctRequest = 'Correct request is: '
+ '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';

const errorMessages = {
  textIsMissing: `Text to convert is required. ${correctRequest}`,
  toCaseIsMissing: `"toCase" query param is required. ${correctRequest}`,
  caseIsNotSupported: 'This case is not supported. '
  + 'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
};

const validCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

const checkTextAndCase = (text, targetCase) => {
  const errors = [];
  const {
    textIsMissing,
    toCaseIsMissing,
    caseIsNotSupported,
  } = errorMessages;

  if (!text) {
    errors.push({ message: textIsMissing });
  }

  if (!targetCase) {
    errors.push({ message: toCaseIsMissing });
  }

  if (!validCases.includes(targetCase) && targetCase) {
    errors.push({ message: caseIsNotSupported });
  }

  return errors;
};

function createServer() {
  return http.createServer((req, res) => {
    res.setHeader('Content-type', 'application/json');

    const normalizedURL = new URL(req.url, `http://${req.headers.host}`);
    const originalText = normalizedURL.pathname.slice(1);
    const targetCase = normalizedURL.searchParams.get('toCase');
    const errors = checkTextAndCase(originalText, targetCase);

    if (errors.length !== 0) {
      res.status = 'Bad request';
      res.statusCode = 400;
      res.end(JSON.stringify({ errors: errors }));

      return;
    }

    res.status = 'OK';
    res.statusCode = 200;

    const convertedText = convertToCase(originalText, targetCase);
    const responseBody = {
      ...convertedText,
      targetCase,
      originalText,
    };

    res.end(JSON.stringify(responseBody));
  });
}

module.exports = { createServer };
