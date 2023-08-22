/* eslint-disable max-len */

/**
 * @typedef {'SNAKE' | 'KEBAB' | 'CAMEL' | 'PASCAL' | 'UPPER'} CaseName
 */

/**
 * @type {CaseName[]}
 */
const availableCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

/**
 * @typedef {Object} Arguments
 * @property {string} text
 * @property {string | null} toCase
 *
 * @typedef {object} ValidatedArguments
 * @property {string} text
 * @property {CaseName} toCase
 *
 * @param {Arguments} args
 *
 * @returns {ValidatedArguments}
 */
function validateArguments(args) {
  const { text, toCase } = args;
  const errors = [];

  if (text === '') {
    errors.push({
      message: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  }

  if (toCase === null) {
    errors.push({
      message: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  }

  if (
    toCase !== null
    && !availableCases.includes(toCase)
  ) {
    errors.push({
      message: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
    });
  }

  if (errors.length > 0) {
    const error = new Error('Validation erorrs');

    error.errors = errors;

    throw error;
  }

  return {
    text,
    toCase,
  };
}

module.exports = {
  validateArguments,
};
