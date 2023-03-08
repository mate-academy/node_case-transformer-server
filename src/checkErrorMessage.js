/* eslint-disable max-len */
const possibleErrorMessages = {
  noText: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  noCase: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  wrongCase: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
};

const possibleCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function checkErrorMessage(text, toCase) {
  const errors = [];
  const {
    noText,
    noCase,
    wrongCase,
  } = possibleErrorMessages;

  if (!text) {
    errors.push({ message: noText });
  }

  if (!toCase) {
    errors.push({ message: noCase });
  }

  if (!possibleCases.includes(toCase) && toCase) {
    errors.push({ message: wrongCase });
  }

  return { errors };
}

module.exports = {
  checkErrorMessage,
};
