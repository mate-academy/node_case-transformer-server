/* eslint-disable max-len */
const http = require('http');
const { convertToCase } = require('./convertToCase');
const CASE_PARAMS = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
const errorMessages = {
  textMissing: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  toCaseMissing: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  caseNotFined: `This case is not supported. Available cases: ${CASE_PARAMS.join(', ')}.`,
};

const createServer = () => {
  return http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const splitURL = req.url.split('?');
    const textToConvert = splitURL[0].slice(1);
    const queryString = splitURL[1];
    const params = new URLSearchParams(queryString);
    const toCase = params.get('toCase');

    const errorChecker = !textToConvert || !toCase || !CASE_PARAMS.includes(toCase);
    const throwErrorMessage = {
      errors: [],
    };

    if (errorChecker) {
      if (!textToConvert) {
        throwErrorMessage.errors.push({
          message: errorMessages.textMissing,
        });
      }

      if (!toCase) {
        throwErrorMessage.errors.push({
          message: errorMessages.toCaseMissing,
        });
      }

      if (!CASE_PARAMS.includes(toCase) && toCase) {
        throwErrorMessage.errors.push({
          message: errorMessages.caseNotFined,
        });
      }

      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      res.end(JSON.stringify(throwErrorMessage));
    } else {
      const { originalCase, convertedText } = convertToCase(textToConvert, toCase);

      res.statusCode = 200;
      res.statusMessage = 'OK';

      const response = {
        originalCase,
        targetCase: toCase,
        originalText: textToConvert,
        convertedText,
      };

      res.end(JSON.stringify(response));
    }
  });
};

module.exports = { createServer };
