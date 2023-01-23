/* eslint-disable */

const { availableCases } = require('./availableCases');

const textIsMissing = 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';

const caseIsMissing = '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';

const caseIsNotSupported = `This case is not supported. Available cases: ${availableCases.join(', ')}.`;

module.exports = {
  textIsMissing,
  caseIsMissing,
  caseIsNotSupported,
};
