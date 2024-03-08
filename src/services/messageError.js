const { CASE_NAME } = require('../consts/CASES');
const {
  ERROR_TEXT_MISSING,
  ERROR_TOCASE_MISSING,
  ERROR_TOCASE_INVALID,
} = require('../consts/ERROR_TYPE');

const messageError = (originalText, targetCase) => {
  const errors = [];

  if (!originalText) {
    errors.push(ERROR_TEXT_MISSING);
  };

  if (!targetCase) {
    errors.push(ERROR_TOCASE_MISSING);
  };

  if (!CASE_NAME.includes(targetCase)) {
    errors.push(ERROR_TOCASE_INVALID);
  }

  return errors;
};

module.exports = {
  messageError,
};
