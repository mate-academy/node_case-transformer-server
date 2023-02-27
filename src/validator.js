/* eslint-disable max-len */

const errors = {
  text_is_missing: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  toCase_is_missing: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  toCase_unsupported: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
};

const validCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function validator(text, convertCase) {
  return {
    errors: [
      ...(!text ? [{ message: errors.text_is_missing }] : []),
      ...(!convertCase ? [{ message: errors.toCase_is_missing }] : []),
      ...(!validCases.includes(convertCase) && convertCase ? [{ message: errors.toCase_unsupported }] : []),
    ],
  };
}

module.exports = { validator };
