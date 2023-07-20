const acceptableCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
const errorMessages = {
  noText: 'Text to convert is required. '
  + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  noCase: '"toCase" query param is required. '
  + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  wrongCase: 'This case is not supported. '
  + 'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
}

const getErrors = (givenText, givenCase) => {
  const errors = [];

  if (!givenText) {
    errors.push({
      message: errorMessages.noText,
    });
  }

  if (!givenCase) {
    errors.push({
      message: errorMessages.noCase,
    });
  }

  if (givenCase && !acceptableCases.includes(givenCase)) {
    errors.push({
      message: errorMessages.wrongCase,
    });
  }

  return errors;
};

module.exports = { getErrors };
