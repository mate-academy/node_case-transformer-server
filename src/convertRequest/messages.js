const { SUPPORTED_CASES } = require('./constants');

const textIsMissed =
  'Text to convert is required. ' +
  'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';

const toCaseIsMissed =
  '"toCase" query param is required. Correct request is:' +
  ' "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';

const toCaseIsNotSupported =
  'This case is not supported. Available cases: ' +
  `${SUPPORTED_CASES.join(', ')}.`;

module.exports = {
  textIsMissed,
  toCaseIsMissed,
  toCaseIsNotSupported,
};
