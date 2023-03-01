/* eslint-disable max-len */
const errors = {
  textIsMissing: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  toCaseIsMissing: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  toCaseIsNotSupported: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
};

const validCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function validator(text, toCase) {
  return {
    errors: [
      ...(!text ? [{ message: errors.textIsMissing }] : []),
      ...(!toCase ? [{ message: errors.toCaseIsMissing }] : []),
      ...(!validCases.includes(toCase) && toCase ? [{ message: errors.toCaseIsNotSupported }] : []),
    ],
  };
}

module.exports = { validator };
