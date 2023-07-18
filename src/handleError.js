/* eslint-disable max-len */
const availableCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

const errors = {
  missedText: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  missedCase: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  notListedCase: `This case is not supported. Available cases: ${availableCases.join(', ')}.`,
};

function handleError(text, convertCase) {
  const handledErrors = [];

  if (!text) {
    handledErrors.push({ message: errors.missedText });
  }

  if (!convertCase) {
    handledErrors.push({ message: errors.missedCase });
  }

  if (convertCase && !availableCases.includes(convertCase)) {
    handledErrors.push({ message: errors.notListedCase });
  }

  return handledErrors;
}

module.exports = { handleError };
