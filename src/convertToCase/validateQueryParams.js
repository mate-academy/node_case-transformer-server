const { errorMessage } = require('../errorMessage');

const supportedCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

const validateQueryParams = (text, targetCase) => {
  const errors = [];

  if (!targetCase) {
    errors.push(
      { message: errorMessage.caseIsIsRequired },
    );
  }

  if (!text) {
    errors.push(
      { message: errorMessage.textIsRequired },
    );
  }

  if (targetCase && !supportedCases.includes(targetCase)) {
    errors.push(
      { message: errorMessage.caseIsNotSupported },
    );
  }

  return errors;
};

module.exports = {
  validateQueryParams,
};
