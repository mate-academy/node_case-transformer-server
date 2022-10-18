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
    const casesList = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
    const errorMessageTextReq = 'Text to convert is required. '
    + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';
    const errorCaseNotSupp = 'This case is not supported. '
    + 'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.';
    const errorToCaseReq = '"toCase" query param is required. '
    + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';

    res.setHeader('Content-Type', 'application/json');

    if (!params.length) {
      returnedListError.push({
        message: errorMessageTextReq,
      });
    }

    if (typeof toCase === 'string' && toCase.length > 0) {
      if (casesList.includes(toCase)) {
        const caseParams = detectCase(params);
        const changedText = convertToCase(params, toCase).convertedText;

        returnedObj = {
          originalCase: caseParams,
          convertedText: changedText,
          targetCase: toCase,
          originalText: params,
        };
      } else {
        returnedListError.push({
          message: errorCaseNotSupp,
        });
      }
    } else {
      returnedListError.push({
        message: errorToCaseReq,
      });
    }

    if (!returnedListError.length) {
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
