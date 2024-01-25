/* eslint-disable max-len */
const possibleCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

const errorMessages = {
  missingToCase: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  textNotFound: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  incorrectCase: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
};

const findErrors = (text, caseName) => {
  const errors = [];

  if (!text || text === '') {
    errors.push({ message: errorMessages.textNotFound });
  }

  if (!caseName) {
    errors.push({ message: errorMessages.missingToCase });
  }

  if (caseName && !possibleCases.includes(caseName)) {
    errors.push({ message: errorMessages.incorrectCase });
  }

  return errors;
};

module.exports = {
  findErrors,
};
