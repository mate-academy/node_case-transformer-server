/* eslint-disable operator-linebreak */
/**
 * @typedef {'SNAKE' | 'KEBAB' | 'CAMEL' | 'PASCAL' | 'UPPER'} CaseName
 *
 * @param text
 * @param caseName
 *
 *  @typedef {array} Result
 * @returns {Result}
 */
function validateConvertParams(text, caseName) {
  const CASE_VARIANTS = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
  const errors = [];
  let error = {};
  let message = '';

  if (text < 1) {
    message =
      'Text to convert is required. Correct request ' +
      'is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';

    error = { message };
    errors.push(error);
  }

  if (!caseName) {
    message =
      '"toCase" query param is required. Correct request ' +
      'is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';

    error = { message };
    errors.push(error);
  }

  if (caseName && !CASE_VARIANTS.includes(caseName)) {
    message =
      'This case is not supported. ' +
      `Available cases: ${CASE_VARIANTS.join(', ')}.`;

    error = { message };
    errors.push(error);
  }

  return errors;
}

module.exports = { validateConvertParams };
