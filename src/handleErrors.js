const {
  MISSED_CASE_NAME,
  MISSED_TEXT,
  NOT_EXISTING_CASE_NAME,
  CASE_NAMES,
} = require('./constants');

function handleErrors(originalText, targetCase) {
  const errors = [];

  if (!originalText) {
    errors.push({ message: MISSED_TEXT });
  }

  if (!targetCase) {
    errors.push({ message: MISSED_CASE_NAME });
  }

  if (targetCase && !CASE_NAMES.includes(targetCase)) {
    errors.push({ message: NOT_EXISTING_CASE_NAME });
  }

  return errors;
};

module.exports = { handleErrors };
