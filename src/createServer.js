const http = require('http');
const { detectCase } = require('./convertToCase/detectCase');
const { convertToCase } = require('./convertToCase/convertToCase');

const createServer = () => {
  const server = http.createServer((req, res) => {
    const normalizedUrl = new URL(req.url, `http://${req.headers.host}`);
    const params = normalizedUrl.pathname.replace('/', '');
    const toCase = normalizedUrl.searchParams.get('toCase');
    let returnedObj = {};
    const returnedListError = [];
    let isErrors = false;

    if (params.length === 0) {
      isErrors = true;

      returnedListError.push({
        message: 'Text to convert is required. '
        + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (typeof toCase === 'string' && toCase.length > 0) {
      if (toCase === 'SNAKE' || toCase === 'KEBAB'
      || toCase === 'CAMEL' || toCase === 'PASCAL' || toCase === 'UPPER') {
        const caseParams = detectCase(params);
        const changedText = convertToCase(params, toCase);

        returnedObj = {
          originalCase: caseParams,
          convertedText: changedText.convertedText,
          targetCase: toCase,
          originalText: params,
        };
      } else {
        isErrors = true;

        returnedListError.push({
          message: 'This case is not supported. '
          + 'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
        });
      }
    } else {
      isErrors = true;

      returnedListError.push({
        message: '"toCase" query param is required. '
        + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    res.setHeader('Content-Type', 'application/json');

    if (!isErrors) {
      res.statusCode = 200;
    } else {
      res.statusCode = 400;
    }

    if (res.statusCode === 200) {
      res.end(JSON.stringify(returnedObj));
    } else {
      res.end(JSON.stringify(returnedListError));
    }
  });

  return server;
};

module.exports = { createServer };
