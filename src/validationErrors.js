'use strict';
/* eslint-disable max-len */

const { allowedCases } = require('./AllowedCases');

const validationErrors = {
  missingTextToTransform: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  missingToCase: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  unUllowedCase: `This case is not supported. Available cases: ${allowedCases.join(', ')}.`,
};

module.exports = {
  validationErrors,
};
