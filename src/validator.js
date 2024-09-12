/* eslint-disable max-len */
const errorsMessages = {
  textIsMissing: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  toCaseIsMissing: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  toCaseIsNotSupported: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
};

const validCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function validator(text, toCase) {
  const errors = [];
  const {
    textIsMissing,
    toCaseIsMissing,
    toCaseIsNotSupported,
  } = errorsMessages;

  if (!text) {
    errors.push({ message: textIsMissing });
  }

  if (!toCase) {
    errors.push({ message: toCaseIsMissing });
  }

  if (!validCases.includes(toCase) && toCase) {
    errors.push({ message: toCaseIsNotSupported });
  }

  return { errors };
}

module.exports = { validator };
