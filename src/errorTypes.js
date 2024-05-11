/* eslint-disable max-len */
const { CASES } = require('./CASES.js');
const casesToString = [...CASES].join(', ');

const errorTypes = {
  toCaseRequired:
    '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  toCaseNotSupported: `This case is not supported. Available cases: ${casesToString}.`,
  textToConvertRequired:
    'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  serverError: 'Internal server error.',
};

module.exports = { errorTypes };
