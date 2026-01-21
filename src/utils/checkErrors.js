'use strict';

const errorsMessages = require('./errorsMessages');

const checkErrors = (textToTransform, toCase) => {
  const allowedCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

  const errors = [];

  if (!textToTransform) {
    errors.push({
      message: errorsMessages.noTextError,
    });
  }

  if (!toCase) {
    errors.push({
      message: errorsMessages.noCaseError,
    });
  }

  if (!(allowedCases.includes(toCase)) && toCase) {
    errors.push({
      message: errorsMessages.invalidCaseError,
    });
  }

  return errors;
};

module.exports = {
  checkErrors,
};
