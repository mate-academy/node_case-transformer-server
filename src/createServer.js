const http = require('http');
const { convertToCase } = require('./convertToCase');

const createServer = () => http.createServer((req, res) => {
  const myURL = new URL(req.url, `http://${req.headers.host}`);
  const originalText = myURL.pathname.slice(1);
  const searchParams = Object.fromEntries(myURL.searchParams.entries());
  const targetCase = searchParams.toCase;
  const supportedCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
  const errorTypes = {
    textIsMissing: 'text is missing',
    toCaseIsMissing: 'to case is missing',
    notSupportedCase: 'not supported case',
  };
  const errorsObj = {
    errors: [],
  };

  const getError = (errorType) => {
    switch (errorType) {
      case errorTypes.textIsMissing:
        return (
          {
            message: 'Text to convert is required. '
              + 'Correct request is: '
              + '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
          }
        );

      case errorTypes.toCaseIsMissing:
        return (
          {
            message: '"toCase" query param is required. '
              + 'Correct request is: '
              + '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
          }
        );

      case errorTypes.notSupportedCase:
        return (
          {
            message: 'This case is not supported. '
              + 'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
          }
        );

      default:
        return null;
    }
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
