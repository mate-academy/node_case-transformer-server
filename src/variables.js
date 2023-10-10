const SUPPORTED_CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
const SUCCESS_CODE = 200;
const ERROR_CODE = 400;
const SUCCESS_STATUS = 200;
const ERROR_STATUS = 400;
const PORT = 5700;

const errorMessages = {
  NoOriginalText: 'Text to convert is required.'
    + ' Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  NoFormattingType: '"toCase" query param is required.'
    + ' Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  WrongFormattingType: 'This case is not supported.'
    + ` Available cases: ${SUPPORTED_CASES.join(', ')}.`,
};

module.exports = {
  SUPPORTED_CASES,
  SUCCESS_CODE,
  ERROR_CODE,
  SUCCESS_STATUS,
  ERROR_STATUS,
  PORT,
  errorMessages,
};
