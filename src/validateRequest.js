const { cases, errorMessages } = require('./constants');

function validateRequest(originalText, targetCase) {
  const errors = [];

  if (!originalText || originalText.trim() === '') {
    errors.push({ message: errorMessages.missingText });
  }

  if (!targetCase) {
    errors.push({ message: errorMessages.missingToCase });
  }

  if (targetCase && !cases.includes(targetCase)) {
    errors.push({ message: errorMessages.invalidToCase });
  }

  return errors;
}

module.exports = { validateRequest };
