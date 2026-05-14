const { SUPPORTED_CASES } = require('./constants');
const {
  textIsMissed,
  toCaseIsMissed,
  toCaseIsNotSupported,
} = require('./messages');

/**
 * Validates case-transform API input (plain data, no Node `http`).
 *
 * @param {{ text: string, toCase: string | undefined }} input
 */
function validateConvertRequest({ text, toCase }) {
  const result = { statusCode: 200, statusMessage: 'Ok', errors: [] };

  if (!text) {
    result.errors.push({ message: textIsMissed });
  }

  if (!toCase) {
    result.errors.push({ message: toCaseIsMissed });
  }

  if (toCase && !SUPPORTED_CASES.includes(toCase)) {
    result.errors.push({ message: toCaseIsNotSupported });
  }

  if (result.errors.length) {
    result.statusCode = 400;
    result.statusMessage = 'Bad request';
  }

  return result;
}

module.exports = {
  validateConvertRequest,
};
