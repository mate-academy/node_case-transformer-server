'use strict';

const http = require("http");
const {isValidToCase} = require("./isValidToCase");
const {convertToCase} = require("./convertToCase/convertToCase");

const createServer = () => http.createServer((req, res) => {
  const normalizedUrl = new URL(req.url, `http://${req.headers.host}/`);
  const textToConvert = normalizedUrl.pathname.slice(1);
  const toCase = normalizedUrl.searchParams.get('toCase');

  const errorMessages = {
    errors: [],
  };

  if (!textToConvert) {
    errorMessages.errors.push({
      // eslint-disable-next-line max-len
      message: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  }

  if (!toCase) {
    errorMessages.errors.push({
      // eslint-disable-next-line max-len
      message: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  }

  if (toCase && !isValidToCase(toCase)) {
    errorMessages.errors.push({
      // eslint-disable-next-line max-len
      message: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
    });
  }

  res.setHeader('Content-Type', 'application/json');

  if (errorMessages.errors.length) {
    res.statusCode = 400;
    res.statusText = 'Bad Request';
    res.end(JSON.stringify(errorMessages));

    return;
  }

  const response = {
    ...convertToCase(textToConvert, toCase),
    targetCase: toCase,
    originalText: textToConvert,
  };

  res.statusCode = 200;
  res.statusText = 'OK';
  res.end(JSON.stringify(response));
});

module.exports = {
  createServer,
};
