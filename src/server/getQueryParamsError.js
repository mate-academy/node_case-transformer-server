/* eslint-disable max-len */
const { validCases, errorMessages } = require('./constants.js');

const getQueryParamsError = (originalText, targetCase) => {
  const errorArray = [];

  if (!originalText) {
    errorArray.push(new Error(errorMessages.noText));
  }

  if (!targetCase) {
    errorArray.push(new Error(errorMessages.noCase));
  }

  if (targetCase && !validCases.includes(targetCase)) {
    errorArray.push(new Error(errorMessages.unsupportedCase));
  }

  return errorArray;
};

module.exports = {
  getQueryParamsError,
};
