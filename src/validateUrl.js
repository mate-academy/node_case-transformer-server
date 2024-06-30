const { Errors } = require('./Errors');

const validateUrl = (url) => {
  const supportedCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
  const errors = [];

  const textToConvert = url.pathname.slice(1);
  const toCase = url.searchParams.get('toCase');

  if (!textToConvert) {
    errors.push({ message: Errors.noTextError });
  }

  if (!toCase) {
    errors.push({ message: Errors.noCaseError });
  }

  if (toCase && !supportedCases.includes(toCase)) {
    errors.push({ message: Errors.unsupportedCaseError });
  }

  return errors;
};

module.exports = {
  validateUrl,
};
