const { invalidText, invalidToCase, invalidToCaseValue } = require('./errors');

const supportedCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function validateInput(word, query) {
  const errors = [];

  if (!word) {
    errors.push({
      message: invalidText,
    });
  }

  if (!query) {
    errors.push({
      message: invalidToCase,
    });
  } else if (!supportedCases.includes(query)) {
    errors.push({
      message: invalidToCaseValue,
    });
  }

  return errors;
}

module.exports = { validateInput };
