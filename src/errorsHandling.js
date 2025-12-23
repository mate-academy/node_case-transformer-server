const {
  ERORR_MESSAGE_CASE_NOT_EXIST,
  ERORR_MESSAGE_CASE_REQUIRED,
  ERORR_MESSAGE_TEXT_REQUIRED,
  cases,
} = require('./variables');

function getErrors(originalText, targetCase) {
  const errors = [];

  if (!originalText) {
    errors.push({
      message: ERORR_MESSAGE_TEXT_REQUIRED,
    });
  }

  if (!targetCase) {
    errors.push({
      message: ERORR_MESSAGE_CASE_REQUIRED,
    });
  }

  if (targetCase && !cases.includes(targetCase)) {
    errors.push({
      message: ERORR_MESSAGE_CASE_NOT_EXIST,
    });
  }

  return errors;
}

module.exports = {
  getErrors,
};
