'use strict';

const { errorMessages } = require('./errorMessages');

const validateText = (text) => {
  if (!text) {
    return {
      message: errorMessages.textMissing,
    };
  } else {
    return false;
  }
};

module.exports = { validateText };
