/* eslint-disable operator-linebreak */
const http = require('http');

const {
  convertToCase,
} = require('./convertToCase');

function createServer() {
  const server = http.createServer((req, res) => {
    const normalizedURL = new URL(req.url, `http://${req.headers.host}`);
    const errors = [];
    const textToConvert = normalizedURL.pathname.slice(1);
    const caseName = normalizedURL.searchParams.get('toCase');
    const caseNames = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
    const ERROR_MESSAGES = {
      textToConvertRequired: 'Text to convert is required.' +
        ' Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      caseNameRequired: '"toCase" query param is required.' +
        ' Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      unsupportedCase: 'This case is not supported.' +
        ' Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
    };
    const STATUS_CODES = {
      successStatus: 200,
      badRequestStatus: 400,
    };

    if (!textToConvert) {
      errors.push({
        message: ERROR_MESSAGES.textToConvertRequired,
      });
    }

    if (!caseName) {
      errors.push({
        message: ERROR_MESSAGES.caseNameRequired,
      });
    } else if (!caseNames.includes(caseName)) {
      errors.push({
        message: ERROR_MESSAGES.unsupportedCase,
      });
    }

    if (errors.length) {
      res.writeHead(STATUS_CODES.badRequestStatus, 'Bad request', {
        'Content-Type': 'application/json',
      });

      res.end(JSON.stringify({
        errors,
      }));
    } else {
      res.writeHead(STATUS_CODES.successStatus, 'OK', {
        'Content-Type': 'application/json',
      });

      const {
        originalCase,
        convertedText,
      } = convertToCase(textToConvert, caseName);
      const result = {
        originalCase,
        targetCase: caseName,
        originalText: textToConvert,
        convertedText,
      };

      res.end(JSON.stringify(result));
    }
  });

  return server;
}

module.exports = {
  createServer,
};
