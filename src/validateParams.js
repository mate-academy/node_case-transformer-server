const errors = require('./errorMessage');

const supportedCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

const validateParams = (urlText, toCase) => {
  const validation = {
    errors: [],
  };

  if (!urlText) {
    validation.errors.push({ message: errors.errorMessage.textRequired });
  }

  if (!toCase) {
    validation.errors.push({ message: errors.errorMessage.toCaseRequired });
  }

  if (!supportedCases.includes(toCase) && toCase) {
    validation.errors.push({ message: errors.errorMessage.unsupportedCase });
  }

  return validation;
};

module.exports = { validateParams };
