const {
  invalidText,
  invalidToCase,
  invalidToCaseValue,
  supportedCases,
} = require('./error');

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
