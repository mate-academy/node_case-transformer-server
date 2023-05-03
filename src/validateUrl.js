const { caseNames } = require('./constants');
const { errorMessages } = require('./errorMessages');

const validateUrl = (text, toCase) => {
  const errors = [];

  if (!text) {
    errors.push(
      { message: errorMessages.MissingText },
    );
  }

  if (!toCase) {
    errors.push(
      { message: errorMessages.MissingCase },
    );
  }

  if (toCase && !caseNames.includes(toCase)) {
    errors.push(
      { message: errorMessages.WrongCase },
    );
  }

  return errors;
};

module.exports = { validateUrl };
