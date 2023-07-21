const { errorMessage } = require('../errorMessage');

const supportedCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

const validateQueryParams = (text, targetCase) => {
  const errors = [];

  if (!text && !targetCase) {
    errors.push(
      { message: errorMessage.textIsRequired },
      { message: errorMessage.caseIsIsRequired },
    );

    return errors;
  }

  if (!text && !targetCase) {
    errors.push(
      { message: errorMessage.textIsRequired },
      { message: errorMessage.caseIsIsRequired },
    );

    return errors;
  }

  if (!text && supportedCases.includes(targetCase)) {
    errors.push(
      { message: errorMessage.textIsRequired },
    );

    return errors;
  }

  if (!targetCase) {
    errors.push(
      { message: errorMessage.caseIsIsRequired },
    );

    return errors;
  }

  if (!text && !supportedCases.includes(targetCase)) {
    errors.push(
      { message: errorMessage.textIsRequired },
      { message: errorMessage.caseIsNotSupported },
    );

    return errors;
  }

  if (!supportedCases.includes(targetCase)) {
    errors.push(
      { message: errorMessage.caseIsNotSupported },
    );

    return errors;
  }

  return errors;
};

module.exports = {
  validateQueryParams,
};
