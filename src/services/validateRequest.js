const { ERROR_MESSAGES } = require('../types/errors');

const CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

const validateRequest = (targetCase, originalText) => {
  const errors = [];

  if (!targetCase) {
    errors.push({ message: ERROR_MESSAGES.TO_CASE_REQUIRED });
  }

  if (!originalText) {
    errors.push({ message: ERROR_MESSAGES.TEXT_REQUIRED });
  }

  if (targetCase && !CASES.includes(targetCase.toUpperCase())) {
    errors.push({ message: ERROR_MESSAGES.CASE_NOT_SUPPORTED });
  }

  if (errors.length) {
    throw errors;
  }
};

module.exports = validateRequest;
