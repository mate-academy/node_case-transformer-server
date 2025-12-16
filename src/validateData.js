/* eslint-disable max-len */
const errorMessages = {
  textRequired: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  caseNameRequired: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  invalidCase: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
};

function validateData(text, caseName) {
  const validCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
  const errors = [];

  if (!text) {
    errors.push({ message: errorMessages.textRequired });
  }

  if (!caseName) {
    errors.push({ message: errorMessages.caseNameRequired });
  }

  if (caseName && !validCases.includes(caseName)) {
    errors.push({ message: errorMessages.invalidCase });
  }

  return errors;
}

module.exports = {
  validateData,
};
