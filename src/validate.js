/* eslint-disable max-len */
const errors = {
  noText:
    'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  noToCase:
    '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  notSupported:
    'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
};
const validCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

const validate = (toCase, text) => {
  return {
    errors: [
      ...(!text ? [{ message: errors.noText }] : []),
      ...(!toCase ? [{ message: errors.noToCase }] : []),
      // eslint-disable-next-line max-len
      ...((!validCases.includes(toCase) && toCase) ? [{ message: errors.notSupported }] : []),
    ],
  };
};

module.exports = { errors, validate };
