'use strict';

const CaseName = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

const { errorMessages } = require('./errorMessages');

const validateParams = (params) => {
  try {
    const param = params.get('toCase');

    if (param === null || param === '') {
      return {
        message: errorMessages.targetCaseMissing,
      };
    }

    if (!CaseName.includes(param)) {
      return {
        message: errorMessages.unknownCase,
      };
    }

    return false;
  } catch (e) {
    return {
      message: errorMessages.targetCaseMissing,
    };
  }
};

module.exports = { validateParams };
