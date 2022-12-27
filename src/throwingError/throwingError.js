const { errorMessages } = require('./errorMessages');
const cases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function throwingError(targetCase, originalText) {
  const errors = [];

  if (!originalText.length) {
    errors.push(errorMessages.noTextError);
  }

  if (!targetCase) {
    errors.push(errorMessages.noCaseError);
  } else if (!cases.includes(targetCase)) {
    errors.push(errorMessages.caseValueError);
  };

  return errors;
}

exports.throwingError = throwingError;
