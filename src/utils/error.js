const { errors, supportedCases } = require('./constants');

function error(text, convertCase) {
  const { incorectText, incorectCase, notListedCase } = errors;
  const handledErrors = [];

  if (!text) {
    handledErrors.push({ message: incorectText });
  }

  if (!convertCase) {
    handledErrors.push({ message: incorectCase });
  }

  if (convertCase && !supportedCases.includes(convertCase)) {
    handledErrors.push({ message: notListedCase });
  }

  return handledErrors;
}

module.exports = { error };
