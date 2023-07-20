const { errorMessages, cases } = require('./constants');

function catchErrors(text, targetCase) {
  const errors = [];

  if (!text) {
    errors.push({ message: errorMessages.noText });
  }

  if (!targetCase) {
    errors.push({ message: errorMessages.noCase });
  }

  if (targetCase && !cases.includes(targetCase)) {
    errors.push({ message: errorMessages.caseNotSupported });
  }

  return errors;
}

module.exports = { catchErrors };
