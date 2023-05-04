const { availiableCases, example } = require('./constants');

function validateParams(originalText, targetCase) {
  const errors = [];

  if (!originalText) {
    errors.push('Text to convert is required.'
    + ` Correct request is: ${example}.`);
  }

  if (!targetCase) {
    errors.push('"toCase" query param is required.'
    + ` Correct request is: ${example}.`);
  }

  if (targetCase && !availiableCases.includes(targetCase)) {
    errors.push('This case is not supported.'
    + ` Available cases: ${availiableCases.join(', ')}.`);
  }

  return errors;
}

module.exports = {
  validateParams,
};
