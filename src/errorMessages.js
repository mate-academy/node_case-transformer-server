const { SUPPORTED_CASES } = require('./config');

const MISSING_TEXT =
  // eslint-disable-next-line max-len
  'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';
const MISSING_CASE =
  // eslint-disable-next-line max-len
  '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';
const UNSUPPORTED_CASE =
  // eslint-disable-next-line max-len
  `This case is not supported. Available cases: ${SUPPORTED_CASES.join(', ')}.`;

const ERROR_MESSAGES = {
  MISSING_TEXT,
  MISSING_CASE,
  UNSUPPORTED_CASE,
};

module.exports = { ERROR_MESSAGES };
