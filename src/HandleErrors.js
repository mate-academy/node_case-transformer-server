const errorMessages = require('./errorMessages.json');

function handleErrors(textToConvert, toCase) {
  const errors = [];
  const supportedCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

  if (!textToConvert) {
    errors.push({ message: errorMessages.textRequired });
  }

  if (!toCase) {
    errors.push({ message: errorMessages.queryRequired });
  } else {
    if (!supportedCases.includes(toCase)) {
      errors.push({ message: errorMessages.notSuportedCase });
    }
  }

  return errors;
}

module.exports = { handleErrors };
