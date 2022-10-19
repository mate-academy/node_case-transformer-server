const http = require('http');
const { convertToCase } = require('./convertToCase');
const { getError, errorTypes } = require('./getError');

const createServer = () => http.createServer((req, res) => {
  const myURL = new URL(req.url, `http://${req.headers.host}`);
  const originalText = myURL.pathname.slice(1);
  const searchParams = Object.fromEntries(myURL.searchParams.entries());
  const targetCase = searchParams.toCase;
  const supportedCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
  const errorsObj = {
    errors: [],
  };

  if (!originalText) {
    errorsObj.errors.push(getError(errorTypes.textIsMissing));
  };

  if (!targetCase) {
    errorsObj.errors.push(getError(errorTypes.toCaseIsMissing));
  } else if (!(supportedCases.includes(targetCase))) {
    errorsObj.errors.push(getError(errorTypes.notSupportedCase));
  };

  res.setHeader('Content-type', 'application/json');

  if (errorsObj.errors.length) {
    res.statusCode = 400;
    res.statusText = 'Bad request';
    res.end(JSON.stringify(errorsObj));

    return;
  }

  const {
    originalCase, convertedText,
  } = convertToCase(originalText, targetCase);

  res.statusCode = 200;

  res.end(JSON.stringify({
    originalCase,
    targetCase,
    originalText,
    convertedText,
  }));
});

module.exports = { createServer };
