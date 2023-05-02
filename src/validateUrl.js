const { errorMessages } = require('./errorMessages');

const caseNames = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

const validateUrl = (text, toCase) => {
  const errors = [];

  if (!text) {
    errors.push(
      {
        message: errorMessages.MissingText,
      },
    );
  }

  if (!toCase) {
    errors.push(
      {
        message: errorMessages.MissingCase,
      },
    );
  } else if (!caseNames.includes(toCase)) {
    errors.push(
      {
        message: errorMessages.WrongCase,
      },
    );
  }

  return errors;
};

module.exports = { validateUrl };
