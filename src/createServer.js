const http = require('http');
const { convertToCase } = require('./convertToCase');

const getDataFromUrl = (url, host) => {
  const normalizedUrl = new URL(url, `http://${host}`);
  const toCase = Object.fromEntries(normalizedUrl.searchParams.entries())
    .toCase;
  const path = normalizedUrl.pathname.slice(1);

  return { toCase, path };
};

const errorTypes = {
  missedText: 'Text to convert is required. Correct request'
  + ' is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  wrongCase: 'This case is not supported.'
  + ' Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
  missingToCase: '"toCase" query param is required.'
  + ' Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
};

const getErrors = (path, toCase) => {
  const errors = [];

  if (!path) {
    addError(errors, errorTypes.missedText);
  }

  if (toCase
      && !['SNAKE', 'KEBAB', 'UPPER', 'CAMEL', 'PASCAL'].includes(toCase)) {
    addError(errors, errorTypes.wrongCase);
  }

  if (!toCase) {
    addError(errors, errorTypes.missingToCase);
  }

  return errors;
};

const setStatus = (res, statusCode, statusMessage) => {
  res.statusCode = statusCode;
  res.statusMessage = statusMessage;
};

const createServer = () => (http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json');

  const { toCase, path } = getDataFromUrl(req.url, req.headers.host);
  const errors = getErrors(path, toCase);

  if (errors.length) {
    setStatus(res, 400, 'Bad request');
    res.end(JSON.stringify({ errors }));

    return;
  }

  setStatus(res, 200, 'OK');

  const { originalCase, convertedText } = convertToCase(path
    , toCase);

  res.end(JSON.stringify({
    originalCase,
    targetCase: toCase,
    originalText: path,
    convertedText,
  }));
}));

function addError(errors, errorMsg) {
  errors.push({ message: errorMsg });
}

module.exports = { createServer };
