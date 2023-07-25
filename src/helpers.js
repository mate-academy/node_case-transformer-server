const { errors, supportedCases } = require('./utils/constants');

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
