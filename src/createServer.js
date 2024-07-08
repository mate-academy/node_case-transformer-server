/* eslint-disable max-len */
const http = require('http');
const url = require('url');
const { convertToCase } = require('./convertToCase');

const CASES_TO_CONVERT = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
const STATUS_OK = 200;
const STATUS_BAD_REQUEST = 400;

const ERROR_MESSAGES = {
  textRequired:
    'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  toCaseRequired:
    '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  caseNotSupported:
    'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
};

const createServer = () => {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const normalizedUrl = new url.URL(req.url, `http://${req.headers.host}`);
    const textToConvert = normalizedUrl.pathname.slice(1);
    const toCase = normalizedUrl.searchParams.get('toCase');

    const errors = [];

    if (!textToConvert) {
      errors.push({ message: ERROR_MESSAGES.textRequired });
    }

    if (!toCase) {
      errors.push({ message: ERROR_MESSAGES.toCaseRequired });
    } else if (!CASES_TO_CONVERT.includes(toCase.toUpperCase())) {
      errors.push({ message: ERROR_MESSAGES.caseNotSupported });
    }

    if (errors.length > 0) {
      res.writeHead(STATUS_BAD_REQUEST);
      res.end(JSON.stringify({ errors }));

      return;
    }

    const { originalCase, convertedText } = convertToCase(
      textToConvert,
      toCase,
    );

    const responseBody = {
      originalCase,
      targetCase: toCase,
      originalText: textToConvert,
      convertedText,
    };

    res.writeHead(STATUS_OK);
    res.end(JSON.stringify(responseBody));
  });

  return server;
};

module.exports = {
  createServer,
};
