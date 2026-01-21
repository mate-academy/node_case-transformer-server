const { validCases, errorMessages } = require('./validateConsts');

const validate = (pathname, toCase) => {
  const errors = [];

  if (!pathname.length) {
    errors.push({
      message: errorMessages.missingText,
    });
  }

  if (!toCase) {
    errors.push({
      message: errorMessages.missingToCase,
    });
  } else if (!(validCases.includes(toCase))) {
    errors.push({
      message: errorMessages.incorrectToCase,
    });
  }

  return errors;
};

module.exports = { validate };
