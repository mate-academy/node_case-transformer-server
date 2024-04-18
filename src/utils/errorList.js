/* eslint-disable max-len */
const { CASE_LIST } = require('./checkCase');

const ERROR_LIST = {
  textRequired:
    'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  caseRequired:
    '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  caseInvalid: `This case is not supported. Available cases: ${CASE_LIST.join(', ')}.`,
};

module.exports = {
  ERROR_LIST,
};
