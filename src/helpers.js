/* eslint-disable max-len */
const supportedCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

const errors = {
  missingText: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  missingCase: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  notListedCase: `This case is not supported. Available cases: ${supportedCases.join(', ')}.`,
};

function handleError(text, convertCase) {
  const { missingText, missingCase, notListedCase } = errors;
  const handledErrors = [];

  if (!text) {
    handledErrors.push({ message: missingText });
  }

  if (!convertCase) {
    handledErrors.push({ message: missingCase });
  }

  if (convertCase && !supportedCases.includes(convertCase)) {
    handledErrors.push({ message: notListedCase });
  }

  return handledErrors;
}

module.exports = { handleError };
