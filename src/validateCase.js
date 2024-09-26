/* eslint-disable max-len */

function validateCase(text, paramCase) {
  const arrayOfErrors = [];
  const messages = {
    textMissing:
      'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    toCaseMissing:
      '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    toCaseIncorrect:
      'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
  };
  const allCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

  if (!text) {
    arrayOfErrors.push({ message: messages.textMissing });
  }

  if (!paramCase) {
    arrayOfErrors.push({ message: messages.toCaseMissing });
  } else if (!allCases.some((c) => c.includes(paramCase))) {
    arrayOfErrors.push({ message: messages.toCaseIncorrect });
  }

  return arrayOfErrors;
}

module.exports = { validateCase };
