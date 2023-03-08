const { errorMessage } = require('./errorMessage');

const validationURL = (textToConvert, toCase) => {
  const error = [];
  const possibleCases = ['SNAKE', 'PASCAL', 'CAMEL', 'KEBAB', 'UPPER'];

  if (!textToConvert) {
    error.push({ message: errorMessage.textEmpty });
  }

  if (!toCase) {
    error.push({ message: errorMessage.toCaseEmpty });
  }

  if (toCase && !possibleCases.includes(toCase)) {
    error.push({ message: errorMessage.toCaseNotValid });
  }

  if (!textToConvert && !possibleCases.includes(toCase)) {
    error.push({ message: errorMessage.toCaseNotValid });
  }

  return error;
};

module.exports = { validationURL };
